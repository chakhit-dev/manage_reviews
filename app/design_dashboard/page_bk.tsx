'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from 'next/navigation'

export default function Dashboard() {
    const { data: session } = useSession()

    // console.log("=============== Session ===============")
    // console.log(session)
    // console.log("=============== End Session ===============")

    if (session) {
        return (
            <div>
                Dashboard
                Signed in as {session.user?.username}
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        )
    }
    else {
        redirect('/login')
        // return (
        //     <div>
        //         Dashboard <br />
        //         Not signed in
        //     </div>
        // )
    }
}