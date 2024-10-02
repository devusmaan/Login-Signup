"use client"


import AllExpenses from "@/components/all-expenses";
import {auth, signOutUser } from "@/firebase/firebaseauth";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";





export default function Home() {

  const router = useRouter();

  function expenseBtn() {
    router.push("/addexpense");
  }



  return (
    <>
      <h1>Home Page</h1>

      <AllExpenses />


      <button onClick={expenseBtn}>Add Expenses</button>

      

      <br /><br /><br />
      <button onClick={() => signOutUser(auth)}>Signout</button>
    </>
  );
}
