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
        password: string
    }

    const [loginData, setLoginData] = useState<Data>({
        username: '',
        password: ''
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
        try {
            const result = await signIn('credentials', {
                redirect: false,
                username: loginData.username,
                password: loginData.password,
                callbackUrl: "/dashboard"
            })
        } catch (error) {
            return error
        }
    }

    if (session) {
        redirect('/dashboard')
    }
    else {
        return (
            <div className="grid place-items-center h-full">

                <div className="w-1/3 flex flex-col gap-3 items-center">
                    <div className="w-full p-4 rounded-lg text-xl text-center font-extrabold">REME | SIGN IN</div>
                    <Input
                        size="sm"
                        label="ชื่อผู้ใช้"
                        type="text"
                        onChange={(e)=>{
                            setLoginData((data)=>({
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
                            setLoginData((data)=>({
                                ...data,
                                password: e.target.value
                            }))
                        }}
                    />
                    <Button size="md" className="bg-purple-950 w-full" onPress={handleSubmit}>เข้าสู่ระบบ</Button>
                </div>


                {/* Login
                <button onClick={() => signIn()}>Sign in</button> */}
            </div>
        )
    }
}