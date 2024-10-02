"use client"


import {auth, signOutUser } from "@/firebase/firebaseauth";





export default function Home() {



  return (
    <>
      <h1>Home Page</h1>
      <button onClick={() => signOutUser(auth)}>Signout</button>
    </>
  );
}
