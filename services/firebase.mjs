import { db } from "./database.mjs";
import { collection, doc, addDoc, getDocs, setDoc } from "firebase/firestore"; 


export async function test_database(){
    try {
        const doc_id = String(Math.floor(Math.random()*100000000000));
        const applicant_id = String(Math.floor(Math.random()*100000000000));
        const steps = Math.floor(Math.random()* 3);
        const application_ref = collection(db,"application_test")

        const docRef = await setDoc(doc(application_ref, doc_id), {
        UID: doc_id,
        Applicant_ID: applicant_id,
        Step: steps,
        Webinar_Date: new Date(),
        Approved: false,
        Docs_Provided: false,
        Is_Complete: false
    });
        console.log("Applicant created");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    }
    

export async function fetchUsers(){
    try{
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((i)=> {
        console.log("data: ", i.data());
    })
    }
    catch(e){
        console.log(e)
    }
} 