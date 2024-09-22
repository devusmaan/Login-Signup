"use client"

import AuthForm from "@/components/authenticationform";
import { SignupForm } from "@/firebase/firebaseauth";
import { useState } from "react";


export default function SignUp() {



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");




    return (
        <>

            <AuthForm
                btnLabel={"Signup"}
                btnFunc={SignupForm}
                showMsg={"Already"}
                loginSiguplink={"Login"}
                linkName={"/login"}
                isLoginPage={false}
            />



        </>
    )
}