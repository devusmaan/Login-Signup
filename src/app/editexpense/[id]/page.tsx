"use client"

import { db, updateExpeceDB } from "@/firebase/firebasefirestore";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ParamType = {
    params: { id: string };
};

export default function Edit({ params: { id } }: ParamType) {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [note, setNote] = useState("");

    useEffect(() => {
        const docRef = doc(db, "expences", id);
        const unsubscribe = onSnapshot(docRef, (doc) => {
            const data = doc.data(); // Check if data exists
            if (data) {
                setTitle(data.title || "");
                setAmount(data.amount || "");
                setCategory(data.category || "");
                setNote(data.note || "");
            }
        });

        return () => unsubscribe(); // Unsubscribe from the listener when the component unmounts
    }, [id]);

    const handleSubmit = () => {
        updateExpeceDB({ id, title, amount, category, note });
        router.push("/");
    };

    return (
        <>
            <input
                type="text"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}

            />

            <br /><br />
            <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                type="number" />

            <br /><br />
            <select
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)} >
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Bills">Bills</option>
                <option value="Education">Education</option>
                <option value="Investments">Investments</option>
                <option value="Luxuries">Luxuries</option>
            </select>

            <br /><br />
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />
            <br /><br />

            <button onClick={handleSubmit} >
                Update Expense
            </button>
        </>
    );
}