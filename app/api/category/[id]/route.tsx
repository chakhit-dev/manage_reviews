import { NextRequest, NextResponse } from "next/server";
import mysql, {RowDataPacket} from "mysql2/promise";
import pool from "@/lib/db";

interface Category extends RowDataPacket {
    type_id:string,
    type_name:string,
}

export async function GET(req:NextRequest, {params}:any) {

    const {id} = await params;

    try {
        const [rows, fields] = await pool.query<Category[]>(`SELECT * FROM category_type WHERE type_id = ?`, [id]);
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(error);
    }
}