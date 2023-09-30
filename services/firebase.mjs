import { db } from "./database.mjs";
import { collection, addDoc } from "firebase/firestore"; 


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
