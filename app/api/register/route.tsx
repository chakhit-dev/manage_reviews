import { NextRequest, NextResponse } from "next/server";
import pool from '@/lib/db';
import mysql,{RowDataPacket} from 'mysql2/promise';

interface User extends RowDataPacket {
  username:string,
  password:string,
  displayname:string,
  role:string
}

export async function POST(req:NextRequest) {
  try {

    const {username, password, displayname} = await req.json();

    const [rows, fields] = await pool.query<User[]>(`INSERT INTO user (username, password, displayname, role) VALUES(?, ?, ?, ?)`,
      [username, password, displayname, 'user']
    );

    return NextResponse.json({ message: 'User created successfully', rows }, { status: 200 });
  } catch (error) {

    return NextResponse.json(error);
  }
}