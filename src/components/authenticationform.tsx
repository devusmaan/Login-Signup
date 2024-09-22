"use client"

import { resetPassword } from "@/firebase/firebaseauth";
import { useRouter } from "next/navigation";
import { useState } from "react";

type btnLabelType = {
    btnLabel: string;
    btnFunc: (email: string, password: string) => void;
    showMsg: string;
    loginSiguplink: string
    linkName: string
    isLoginPage : boolean
}

export default function AuthForm({ btnLabel, btnFunc, showMsg, loginSiguplink, linkName, isLoginPage }: btnLabelType) {



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const pushLink = () => {
        router.push(linkName);
    }



    return (
        <>
            <div>
                <h1>{btnLabel}</h1>

                <input type="email" value={email} placeholder="Enter Email" onChange={(e) => { setEmail(e.target.value) }} />
                <br /><br />
                <input type="password" value={password} placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} />

                <br /><br />
                <p>{showMsg} have an account? <span onClick={pushLink}> {loginSiguplink} </span></p>
                {/* <br /> */}

                {isLoginPage && <p style={{ color: 'blue', cursor: 'pointer' }} onClick={() => {resetPassword(email)}}>Forgot Password?</p>}

                <button onClick={() => { btnFunc(email, password) }}>{btnLabel}</button>

            </div>
        </>
    )
}