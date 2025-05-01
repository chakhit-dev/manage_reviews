import { NextResponse, NextRequest } from 'next/server';

import pool from '@/lib/db';
import mysql, {
    RowDataPacket,
} from 'mysql2/promise';

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
    const {catename} = await params

    try {
        const [rows, fields] = await pool.query<Post[]>(
            `SELECT * FROM post WHERE post_category = ?`,
            [catename]
        );
    
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(error)
    }
}