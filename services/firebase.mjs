import { db } from "./database.mjs";
import { collection, addDoc, getDocs } from "firebase/firestore"; 


export async function test_database(){
    try {
        const docRef = await addDoc(collection(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
        } catch (e) {
        console.error("Error adding document: ", e);
        }
}

export async function fetchUsers(){
    try{
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((i)=> {
        console.log("what is i: ", i.data());
    })
    }
    catch(e){
        console.log(e)
    }
} 