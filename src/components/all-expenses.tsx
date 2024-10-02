import { useEffect, useState } from "react";
import { auth } from "@/firebase/firebaseauth";
import { db, deleteExpense, fetchExpenses } from "@/firebase/firebasefirestore";
import { collection, DocumentData, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { onAuthStateChanged, Unsubscribe, User } from "firebase/auth";
import Link from "next/link";

export default function AllExpenses() {
    const [allExpenses, setAllExpenses] = useState<DocumentData[]>([]);


    useEffect(() => {
        let detachOnAuthListiner = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchExpenseRealtime();
            }
        })

        return () => {
            if (readExpenseRealtime) {
                console.log("Component Unmount.");
                readExpenseRealtime();
                detachOnAuthListiner();
            }


        }

    }, [])

    let readExpenseRealtime: Unsubscribe;


    const fetchExpenseRealtime = () => {
        fetchExpenses();

        let collectionRef = collection(db, "expenses");
        // let currentUserUID = auth.currentUser?.uid;
        let condition = where("uid", "==", auth.currentUser?.uid);
        let q = query(collectionRef, condition);
        let allExpenseClone = [...allExpenses];

        readExpenseRealtime = onSnapshot(q, (querySnapshot) => {
            querySnapshot.docChanges().forEach((change) => {
                let expense = change.doc.data();
                expense.id = change.doc.id;
                if (change.type === "added") {
                    allExpenseClone.push(expense);
                    setAllExpenses([...allExpenseClone])
                }
                if (change.type === "modified") {
                    const index = allExpenseClone.findIndex(e => e.id === expense.id);
                    if (index !== -1) {
                        allExpenseClone[index] = expense;
                    }
                    setAllExpenses([...allExpenseClone]);
                    console.log("modified");
                }
                if (change.type === "removed") {
                    console.log("removed", change);

                    const index = allExpenseClone.findIndex(e => e.id === expense.id);
                    if (index !== -1) {
                        allExpenseClone.splice(index, 1);
                        setAllExpenses([...allExpenseClone]);

                    }
                }
            });

        });
    };

    console.log(allExpenses);



    return (
        <div>
            <h2>Your Expenses</h2>
            {allExpenses.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Tittle</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Optional Note</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>


                        {

                            allExpenses.map(({ tittle, amount, category, optionalNote, firebaseID }) => (
                                <tr key={tittle + 1}>
                                    <td>{tittle}</td>
                                    <td>{amount}</td>
                                    <td>{category}</td>
                                    <td>{optionalNote}</td>
                                    <td> <Link href={`editexpense/${firebaseID}`}><button>Edit</button> </Link>
                                        <button onClick={() => deleteExpense(firebaseID)}>Delete</button></td>
                                </tr>
                            ))

                        }

                    </tbody>
                </table>
            ) : (
                <p>No expenses found.</p>
            )}
        </div>
    );
}








