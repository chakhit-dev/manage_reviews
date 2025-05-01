import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import pool from '@/lib/db'; // เชื่อม MySQL
import { RowDataPacket } from 'mysql2/promise';

export interface Post extends RowDataPacket {
  post_id: number;
  post_by: string;
  post_header: string;
  post_des: string;
  post_img: string;
  post_star: number;
  post_date: string;
  post_category: string;
}

function getFormattedDateTime(): string {
  const now = new Date();
  return now.toISOString().slice(0, 19).replace('T', ' ');
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const post_by = formData.get('post_by')?.toString() ?? '';
    const post_header = formData.get('post_header')?.toString() ?? '';
    const post_des = formData.get('post_des')?.toString() ?? '';
    const post_star = parseInt(formData.get('post_star')?.toString() ?? '0');
    const post_category = formData.get('post_category')?.toString() ?? '';
    const file = formData.get('file');

    let post_img = '';

    if (file && file instanceof File) {
      const bytes = await file.arrayBuffer();
      const buffer = new Uint8Array(bytes); // แปลงเป็น Uint8Array

      const fileName = `${Date.now()}_${file.name}`;
      const folderPath = path.join(process.cwd(), 'public', 'storage', 'imgs');
      const filePath = path.join(folderPath, fileName);

      // ✅ เขียนไฟล์ลง public/storage/imgs/
      await fs.writeFile(filePath, buffer);

      post_img = fileName;
    }

    const post_date = getFormattedDateTime();

    // ✅ Insert ข้อมูลลง MySQL
    const [rows] = await pool.query<Post[]>(`
      INSERT INTO post 
      (post_by, post_header, post_des, post_category, post_img, post_star, post_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [post_by, post_header, post_des, post_category, post_img, post_star, post_date]);

    return NextResponse.json({ message: 'Post created successfully', fileName: post_img }, { status: 201 });
  } catch (err: any) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
