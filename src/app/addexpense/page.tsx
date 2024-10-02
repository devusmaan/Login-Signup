"use client";

import { fetchExpenses, saveExpense } from "@/firebase/firebasefirestore";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function AddExpense() {

    const router = useRouter();

    const [tittle, setTittle] = useState("");
    const [amount, setAmount] = useState("");
    const [allExpenses, setAllExpenses] = useState("")
    const [category, setCategory] = useState("");
    const [optionalNote, setOptionalNote] = useState("");

    function addYourExpenseBtn() {
        router.push("/")

    }
    return (
        <>
            <label htmlFor="tittle">
                Tittle: <input type="text" required value={tittle} onChange={(e) => { setTittle(e.target.value) }} placeholder="Title (e.g. Groceries, Rent)" id="tittle" />
            </label>

            <br /><br />

            <label htmlFor="tittle">
                Amount: <input type="number" required value={amount} onChange={(e) => { setAmount(e.target.value) }} placeholder="Enter Product Amount" id="tittle" />
            </label>

            <br /><br />

            <label htmlFor="categories">Select a category:</label>

            <select required value={category} onChange={(e) => { setCategory(e.target.value) }} name="categories" id="categories">
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="bills">Bills</option>
                <option value="education">Education</option>
                <option value="Investments">Investments</option>
                <option value="luxuries">Luxuries</option>
                <option value="others">Others</option>
            </select>

            <br /><br />

            <label htmlFor="optional-note">
                Optional Note: <textarea value={optionalNote} onChange={(e) => { setOptionalNote(e.target.value) }} id="optional-note" name="Optional Note">
                </textarea>
            </label>

            <br /><br />

            <button onClick={() => {
                saveExpense(tittle, amount, category, optionalNote);
                addYourExpenseBtn();
                fetchExpenses();
            }}>Add Your Expense</button>
        </>
    );
}
