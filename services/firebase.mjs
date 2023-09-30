import { db } from "./database.mjs";
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore"; 


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

export async function fetchApplicants(){
    try{
        const querySnapshot = await getDocs(collection(db, 'applicants'));
        querySnapshot.forEach((i)=> {
        console.log("what is i: ", i.data());
    })
    }
    catch(e){
        console.log(e)
    }
} 

export async function create_applicants_firebase(applicant_list){
    try {
        const promise_collection = []
        applicant_list.forEach(async (applicant)=>{
            console.log(applicant["UID"])
            const collection_ref = collection(db,"applicants");
            const doc_ref = doc(collection_ref, applicant["UID"]);
            promise_collection.push(await setDoc(doc_ref, applicant));
        })
        return await Promise.all([...promise_collection]).then((result)=>{
          console.log("completed");
            return "completed";
        }).catch((e)=>{
           console.log("failed");
             return String(e);
           
        })
    }
    catch(e){

        console.log(e);
        return e
    }
}