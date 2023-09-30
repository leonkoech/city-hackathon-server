import { db } from "./database.mjs";
import { collection, doc, addDoc, getDocs, setDoc, getDoc } from "firebase/firestore"; 
import { getRandomDate, generateRandomBoolean, containsFalseField } from "./utility.mjs";

export const APPLICATIONS = "applications";
export const APPLICANTS = "applicants";

export async function createApplication(application_id, applicant_id, is_complete){
    const steps = is_complete?Math.floor(Math.random()* 3):1;
    const application_ref = collection(db,APPLICATIONS);

    return await setDoc(doc(application_ref, application_id), {
        UID: application_id,
        applicant_ID: applicant_id,
        step: steps,
        webinar_date: getRandomDate(30),
        approved: generateRandomBoolean(),
        docs_provided: generateRandomBoolean(),
        is_complete: is_complete
    });
   
    }
    
export async function fetchCollection(collection_name){
    try{
        const querySnapshot = await getDocs(collection(db, collection_name));
        const documents = []
        querySnapshot.forEach((doc)=> {
            documents.push(doc.data());
        })
        return documents;
    }
    catch(e){
        return []
    }
} 

export async function fetchDocument(collection_name, document_uid){
    const docRef = doc(db, collection_name, document_uid);
    const docSnap = await getDoc(docRef);
    return { "data":docSnap.data(), "id": docSnap.id}
}

export async function fetchApplicants(){
    return await fetchCollection(APPLICANTS)
} 

export async function fetchApplications(){
    return await fetchCollection(APPLICATIONS)
}

export async function createApplicantsFirebase(applicant_list){
    try {
        const promise_collection = []
        applicant_list.forEach(async (applicant)=>{
            const collection_ref = collection(db,APPLICANTS);
            const doc_ref = doc(collection_ref, applicant["UID"]);
            promise_collection.push(await setDoc(doc_ref, applicant));
        })
        return await Promise.all([...promise_collection]).then((result)=>{
          console.log("completed");
            return "completed";
        }).catch((e)=>{
            throw new Error(e)
        })
    }
    catch(e){

        console.log(e);
        return e
    }
}

export async function SetApproval(isTrue, UID){
    const applicationRef = doc(db, APPLICATIONS, UID);
    return await setDoc(applicationRef, { approved: isTrue}, { merge: true } ).then((application)=>{
        return application
    }).catch((e)=>{
        throw new Error(e)
    })
}

export async function SetProvidedDocumentation(application_id){
    const applicationRef = doc(db, APPLICATIONS, application_id);
    const application_doc = await fetchDocument(APPLICATIONS, application_id)
    const application_documentation = application_doc.data["documentation"]
    const all_docs_provided = !containsFalseField(application_documentation)
    const provided_docs_promise = []
    
    provided_docs_promise.push(await setDoc(applicationRef, { docs_provided: all_docs_provided}, { merge: true } ))
     
    if(all_docs_provided){
        provided_docs_promise.push( await SetStep(application_id, 4))
    }
    return await Promise.all([...provided_docs_promise])
    .then((application)=>{
        return application
    }).catch((e)=>{
        throw new Error(e)
    })
}

export async function SetStep(application_id, stepNum){
    const applicationRef = doc(db, APPLICATIONS, application_id);
    return await setDoc(applicationRef, { step: stepNum}, { merge: true })
    .then((application)=>{
        return application
    }).catch((e)=>{
        throw new Error(e)
    })
}

export async function updateDocumentation(application_id, document_id, is_submitted){
    const applicationRef = doc(db, APPLICATIONS, application_id);
    const application_doc = await fetchDocument(APPLICATIONS, application_id)
    const application_documentation = application_doc.data["documentation"]
    const application_documentation_copy = []
    application_documentation.forEach((document)=>{
        if(document.doc_id === document_id){
            document.is_completed = is_submitted;
        }
        application_documentation_copy.push(document)
    })

    const documentation_promises = [
         await setDoc(applicationRef, { documentation: application_documentation_copy}, { merge: true }),
        await SetProvidedDocumentation(application_id),
    ]
     
    return await Promise.all([...documentation_promises]).then((application)=>{
        return application
    }).catch((e)=>{
        throw new Error(e)
    })
}