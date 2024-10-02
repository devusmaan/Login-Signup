import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";
import { app } from "./firebaseconfig";
import { auth } from "./firebaseauth";




export const db = getFirestore(app);

type User = {
    uid: string;
    email?: string | null;

}




export async function saveUser(user: User) {
    try {
        const docRef = doc(db, 'users', user.uid);
        await setDoc(docRef, user);
    } catch (error) {
        console.error("Error saving user:", error);
    }
}


export async function saveExpense(tittle: string, amount: string, category: string, optionalNote: string) {
    const uid = auth.currentUser?.uid;
    const collectionRef = collection(db, "expenses");
    
    try {
      const newExpense = { tittle, uid, amount, category, optionalNote };
      const docRef = await addDoc(collectionRef, newExpense);
      const docRefToUpdate = doc(db, "expenses", docRef.id);
      await updateDoc(docRefToUpdate, {
        firebaseID: docRef.id
      });
    } catch (error) {
      console.log(error);
    }
  }


export async function fetchExpenses() {
    // let docRef = doc(db, "collectionName", "docID");
    // await getDoc(docRef);

    // let collectionRef = collection(db, "collectionName");
    // query(where, condition)
    // await getDocs(collectionRef);

    let collectionRef = collection(db, "expenses");
    let currentUserUID = auth.currentUser?.uid;

    let condition = where("uid", "==", currentUserUID);
    let q = query(collectionRef, condition);

    let allExpensesSnapshot = await getDocs(q);

    let allExpenses = allExpensesSnapshot.docs.map((expenseSnapshot) => {
    let expense = expenseSnapshot.data();
    expense.id = expenseSnapshot.id;
    return expense;
    })
    return allExpenses;

    // console.log(allExpenses);
    
}  



export async function deleteExpense(firebaseID: string) {
  await deleteDoc(doc(db, "expenses", firebaseID));
  console.log(firebaseID)
}


// export const getExpense = async (docId: string) => {
//   const docRef = doc(db, 'expenses', docId);
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//       return docSnap.data();
//   } else {
//       throw new Error('No such document!');
//   }
// };

// export const updateExpense = async (docId: string, data: any) => {
//   const docRef = doc(db, 'expenses', docId);
//   await updateDoc(docRef, data);
// };


type UpdatedExpenceType = {
  id: string,
  title: string,
  amount: string,
  category: string,
  note: string
}



export async function updateExpeceDB(updatedExpence: UpdatedExpenceType) {
    try {
        const docRef = doc(db, "expences", updatedExpence.id);
        const uid = auth.currentUser?.uid;

        // Ensure uid is set correctly to prevent unwanted updates
        if (!uid) {
            throw new Error("User is not authenticated");
        }

        await updateDoc(docRef, {  ////////firebasefirestore.ts:117 
          tittle: updatedExpence.title,
            amount: updatedExpence.amount,
            uid, // Adding uid for reference
            optionalNote: updatedExpence.note,
            category: updatedExpence.category,
            // Uncomment if you want to update the date
            // date: Timestamp.fromDate(new Date())
        });
        
        console.log("Expense updated successfully!");
    } catch (error) {
        console.error("Error updating expense:", error);
    }
}



