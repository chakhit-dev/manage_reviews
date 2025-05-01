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

export async function GET(req: NextRequest, {params}:any) {
    const { id } = await params;

    try {
        const [rows, fields] = await pool.query<User[]>(`SELECT * FROM user WHERE user_id = ?`, [id]);

        const data = rows[0]

        if (!data) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }        

        return NextResponse.json(data, {status:200});
    } catch (error) {
        
        return NextResponse.json(error);
    }
}

export async function PUT(req: NextRequest, {params}:any) {
    const {id} = await params

    try {

        const {username, password, displayname, role} = await req.json();

        const [rows, fields] = await pool.query<User[]>(
            `UPDATE user SET username = ?, password = ?, displayname = ?, role = ? WHERE user_id = ?`,
            [username, password, displayname, role, id]
        );
    
        return NextResponse.json({ message: `Update user id = ${id} successfully` });
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function DELETE(req: NextRequest, {params}:any) {
    const {id} = await params

    try {
        const [rows, fields] = await pool.query<User[]>(
            `DELETE FROM user WHERE user_id = ?`,
            [id]
        );
    
        return NextResponse.json({meassage:`Delete post id = ${id} successfuly`})
    } catch (error) {
        return NextResponse.json(error)
    }
}