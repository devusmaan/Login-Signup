"use client";

import { auth } from "@/firebase/firebaseauth";
import { app } from "@/firebase/firebaseconfig";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function EmailVerification() {

const router = useRouter();
const auth = getAuth(app);

useEffect(() => {
    const checkEmailVerification = () => {
        const user = auth.currentUser;
        if (user) {
            user.reload().then(() => {
                if (user.emailVerified) {
                    router.push("/"); 
                }
            });
        }
    };

    const intervalId = setInterval(checkEmailVerification, 4000);

    return () => clearInterval(intervalId);
}, [auth, router]);


    return (
        <>
            <h3>Email Verification Sent!</h3>
            <p>Kindly verify your email...</p>
        </>
    );
}
