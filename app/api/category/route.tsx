import { NextRequest, NextResponse } from "next/server";
import mysql, {RowDataPacket} from "mysql2/promise";
import pool from "@/lib/db";

interface Category extends RowDataPacket {
    type_id:string,
    type_name:string,
}

export async function GET() {
    try {
        const [rows, fields] = await pool.query<Category[]>(`SELECT * FROM category_type`);
        console.log(rows)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(error);
    }
}