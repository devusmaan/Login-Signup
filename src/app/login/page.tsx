"use client";

import AuthForm from "@/components/authenticationform";
import { loginForm } from "@/firebase/firebaseauth";
import { useState } from "react";

export default function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    return (
        <>

            <AuthForm
                btnLabel={"Login"}
                btnFunc={loginForm}
                showMsg={"Doesn't"}
                loginSiguplink={"Signup"}
                linkName={"/signup"}
                isLoginPage={true}
            />
           


        </>
    )

}