'use client'

import React,{useState} from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { redirect, useRouter } from 'next/navigation'

import { Input, Button } from "@heroui/react";

export default function Login() {
    const { data: session } = useSession()
    const router = useRouter()

    // console.log("=============== Session ===============")
    // console.log(session)
    // console.log("=============== End Session ===============")

    interface Data {
        username: string,
        password: string,
        re_password:string,
        displayname: string
    }

    const [registerData, setRegisterData] = useState<Data>({
        username: '',
        password: '',
        re_password:'',
        displayname: ''
    })

    // const handleSubmit = async (e: any) => {
    //     signIn("credentials", {
    //         username: loginData.username,
    //         password: loginData.password,
    //         redirect: false,
    //         callbackUrl: "/dashboard"
    //     })
    // }

    const handleSubmit = async (e: any) => {

        if(registerData.password != registerData.re_password){
            alert("รหัสไม่ตรงกัน")
        }
        else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
                method: 'POST',
                body: JSON.stringify(registerData),
            });
    
            if (res.ok) {
                const data = await res.json();
                console.log("User created:", data);
                redirect('/dashboard')
            }
        }



        // try {
        //     const result = await signIn('credentials', {
        //         redirect: false,
        //         username: loginData.username,
        //         password: loginData.password,
        //         callbackUrl: "/dashboard"
        //     })
        // } catch (error) {
        //     return error
        // }
    }

    if (session) {
        redirect('/dashboard')
    }
    else {
        return (
            <div className="grid place-items-center h-full">

                <div className="w-1/3 flex flex-col gap-3 items-center">
                    <div className="w-full p-4 rounded-lg text-xl text-center font-extrabold">REME | REGISTER</div>
                    <Input
                        size="sm"
                        label="ชื่อที่จะแสดง"
                        type="text"
                        onChange={(e)=>{
                            setRegisterData((data)=>({
                                ...data,
                                displayname: e.target.value
                            }))
                        }}
                    />
                    <Input
                        size="sm"
                        label="ชื่อผู้ใช้"
                        type="text"
                        onChange={(e)=>{
                            setRegisterData((data)=>({
                                ...data,
                                username: e.target.value
                            }))
                        }}
                    />
                    <Input
                        size="sm"
                        label="รหัสผ่าน"
                        type="password"
                        onChange={(e)=>{
                            setRegisterData((data)=>({
                                ...data,
                                password: e.target.value
                            }))
                        }}
                    />
                    <Input
                        size="sm"
                        label="ยืนยัน-รหัสผ่าน"
                        type="password"
                        onChange={(e)=>{
                            setRegisterData((data)=>({
                                ...data,
                                re_password: e.target.value
                            }))
                        }}
                    />
                    <Button size="md" className="bg-purple-950 w-full" onPress={handleSubmit}>สมัครสมาชิก</Button>
                </div>


                {/* Login
                <button onClick={() => signIn()}>Sign in</button> */}
            </div>
        )
    }
}