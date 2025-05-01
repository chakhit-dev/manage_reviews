import { NextResponse, NextRequest } from 'next/server';

import pool from '@/lib/db';
import mysql, {
    RowDataPacket,
} from 'mysql2/promise';

import {getFormattedDateTime} from "@/utils/getFormattedDateTime"
import path from 'path';
import fs from 'fs/promises';

interface Post extends RowDataPacket {
    post_id:number,
    post_by:string,
    post_header:string,
    post_des:string,
    post_img:string,
    post_star:number,
    post_date:string
}


export async function GET(req: NextRequest, {params}:any) {
    const {id} = await params

    try {
        const [rows, fields] = await pool.query<Post[]>(
            `SELECT * FROM post WHERE post_id = ?`,
            [id]
        );
        const data = rows[0]
    
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(error)
    }
}

// export async function PUT(req: NextRequest, {params}:any) {
//     const {id} = await params

//     try {

//         const {post_header, post_des, post_img, post_star} = await req.json();
//         const post_date = getFormattedDateTime()

//         const [rows, fields] = await pool.query<Post[]>(
//             `UPDATE post SET post_header = ?, post_des = ?, post_img = ?, post_star = ?, post_date = ? WHERE post_id = ?`,
//             [post_header, post_des, post_img, post_star, post_date, id]
//         );
    
//         return NextResponse.json({ message: `Update post id = ${id} successfully` });
//     } catch (error) {
//         return NextResponse.json(error)
//     }
// }

export async function DELETE(req: NextRequest, {params}:any) {
    const {id} = await params

    try {
        const [rows, fields] = await pool.query<Post[]>(
            `DELETE FROM post WHERE post_id = ?`,
            [id]
        );
    
        return NextResponse.json({meassage:`Delete post id = ${id} successfuly`})
    } catch (error) {
        return NextResponse.json(error)
    }
}

// // PUT method
// export async function PUT(req: NextRequest) {
//     try {
//       const formData = await req.formData();
  
//       const post_id = parseInt(formData.get('post_id')?.toString() ?? '0'); // ใช้สำหรับระบุโพสต์ที่จะอัปเดต
//       const post_by = formData.get('post_by')?.toString() ?? '';
//       const post_header = formData.get('post_header')?.toString() ?? '';
//       const post_des = formData.get('post_des')?.toString() ?? '';
//       const post_star = parseInt(formData.get('post_star')?.toString() ?? '0');
//       const post_category = formData.get('post_category')?.toString() ?? '';
//       const file = formData.get('file');
  
//       let post_img = ''; // รูปใหม่ที่จะอัปโหลด (ถ้ามี)
  
//       if (file && file instanceof File) {
//         const bytes = await file.arrayBuffer();
//         const buffer = new Uint8Array(bytes);
  
//         const originalName = file.name;
//         const extension = originalName.split('.').pop() || 'bin';
//         const date = new Date().toISOString().replace(/[:.]/g, '-');
//         const fileName = `csc350_${date}.${extension}`;
  
//         const folderPath = path.join(process.cwd(), 'public', 'storage', 'imgs');
//         const filePath = path.join(folderPath, fileName);
  
//         await fs.writeFile(filePath, buffer);
  
//         post_img = fileName;
//       }
  
//       const [rows, fields] = await pool.query(`
//         UPDATE post SET 
//           post_header = ?, 
//           post_des = ?, 
//           post_category = ?, 
//           post_star = ?
//           ${post_img ? ', post_img = ?' : ''}
//         WHERE post_id = ?
//       `, [post_header, post_des, post_category, post_star, post_img]);
  
//       return NextResponse.json({ message: 'Post updated successfully', updatedImg: post_img || null }, { status: 200 });
//     } catch (err: any) {
//       console.error('Update error:', err);
//       return NextResponse.json({ error: err.message }, { status: 500 });
//     }
//   }
  

export async function PUT(req: NextRequest) {
    try {
      const formData = await req.formData();
  
      const post_id = parseInt(formData.get('post_id')?.toString() ?? '0');
      const post_by = formData.get('post_by')?.toString() ?? '';
      const post_header = formData.get('post_header')?.toString() ?? '';
      const post_des = formData.get('post_des')?.toString() ?? '';
      const post_star = parseInt(formData.get('post_star')?.toString() ?? '0');
      const post_category = formData.get('post_category')?.toString() ?? '';
      const file = formData.get('file');
  
      let post_img = ''; // รูปใหม่ที่จะอัปโหลด (ถ้ามี)
  
      if (file && file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = new Uint8Array(bytes);
  
        const originalName = file.name;
        const extension = originalName.split('.').pop() || 'bin';
        const date = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `csc350_${date}.${extension}`;
  
        const folderPath = path.join(process.cwd(), 'public', 'storage', 'imgs');
        const filePath = path.join(folderPath, fileName);
  
        await fs.writeFile(filePath, buffer);
  
        post_img = fileName;
      }
  
      // === ✅ Dynamic SQL
      const params = [post_header, post_des, post_category, post_star];
      let sql = `
        UPDATE post SET 
          post_header = ?, 
          post_des = ?, 
          post_category = ?, 
          post_star = ?
      `;
  
      if (post_img) {
        sql += `, post_img = ?`;
        params.push(post_img);
      }
  
      sql += ` WHERE post_id = ?`;
      params.push(post_id);
  
      await pool.query(sql, params);
  
      return NextResponse.json(
        { message: 'Post updated successfully', updatedImg: post_img || null },
        { status: 200 }
      );
    } catch (err: any) {
      console.error('Update error:', err);
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
  