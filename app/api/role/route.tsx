import { NextRequest, NextResponse } from "next/server";
import mysql, {RowDataPacket} from "mysql2/promise";
import pool from "@/lib/db";

interface Role extends RowDataPacket {
    role_name:string,
    role_label:string,
}

export async function GET() {
    try {
        const [rows, fields] = await pool.query<Role[]>(`SELECT * FROM role`);
        console.log(rows)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(error);
    }
}