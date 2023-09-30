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
    

export async function fetchApplicants(){
    try{
        const querySnapshot = await getDocs(collection(db, 'applicants'));
        querySnapshot.forEach((i)=> {
        console.log("data: ", i.data());
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