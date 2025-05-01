import { NextResponse, NextRequest } from "next/server";
import pool from '@/lib/db';
import mysql, {
    RowDataPacket,
  } from 'mysql2/promise';

export async function POST(req:NextRequest) {
    
    interface User extends RowDataPacket {
        user_id:number,
        username:string,
        password:string,
        displayname:string,
        role:string
    }

    try {
        const { username, password } = await req.json();

        const [rows, fields] = await pool.query<User[]>(
            `SELECT * FROM user WHERE username = ?`,
            [username]
        );

        if (rows.length === 0) {
            return NextResponse.json({ message: "ไม่พบข้อมูล" }, { status: 404 });
        }

        const user = rows[0];

        if(user.password != password){
            return NextResponse.json({ message: 'รหัสผ่านไม่ตรงกัน'}, { status: 401 })
        }

        return NextResponse.json(user, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}