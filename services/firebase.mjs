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
        applicant_ID: applicant_id,
        step: steps,
        webinar_date: new Date(),
        approved: false,
        docs_provided: false,
        is_complete: false
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

export async function SetApproval(isTrue, UID){
    const applicationRef = doc(db, 'application_test', UID);
    setDoc(applicationRef, { approved: isTrue}, { merge: true } );
}

export async function SetProvidedDocumentation(isTrue, UID){
    const applicationRef = doc(db, 'application_test', UID);
    setDoc(applicationRef, { docs_provided: isTrue}, { merge: true } );
}

export async function SetStep(ID, stepNum){
    const applicationRef = doc(db, 'application_test', ID);
    setDoc(applicationRef, { step: stepNum}, { merge: true } );
}