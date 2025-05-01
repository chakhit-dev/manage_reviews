import pool from '@/lib/db';
import mysql, { RowDataPacket } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

interface Post extends RowDataPacket {
  post_id: number,
  post_by: string,
  post_header: string,
  post_des: string,
  post_img: string,
  post_star: number,
  post_date: string,
  post_category: string
}

export function getFormattedDateTime(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export async function GET() {
  try {
    const [rows, fields] = await pool.query<Post[]>(`SELECT * FROM post`);

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(error);
  }
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

      // const fileName = `${Date.now()}_${file.name}`;
      // const fileName = `csc350_${file.name}`;

      const originalName = file.name;
      const extension = originalName.split('.').pop() || 'bin'; // ดึงนามสกุลไฟล์ เช่น jpg, png
      const date = new Date().toISOString().replace(/[:.]/g, '-'); // ทำให้ปลอดภัยในชื่อไฟล์
      const fileName = `csc350_${date}.${extension}`;
    
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
