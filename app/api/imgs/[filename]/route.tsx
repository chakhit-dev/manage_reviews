import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(request: NextRequest, { params }: { params: { filename: string } }) {
  const { filename } = params;
  const filePath = path.join(process.cwd(), '/storage/imgs', filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse('File not found', { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': `inline; filename="${filename}"`,
    },
  });
}
