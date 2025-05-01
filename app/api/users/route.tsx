import { NextRequest, NextResponse } from "next/server";
import mysql, {RowDataPacket} from "mysql2/promise";
import pool from "@/lib/db";

interface User extends RowDataPacket {
    user_id:string,
    username:string,
    password:string,
    displayname:string,
    role:string
}

export async function GET() {
    try {
        const [rows, fields] = await pool.query<User[]>(`SELECT * FROM user`);
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(error);
    }
}