import { fetchApplicants } from "./firebase.mjs";
import { createApplication } from "./firebase.mjs";
import { generateRandomUID,  } from "./utility.mjs";

export async function createApplications(){
  const applicants = await fetchApplicants();
  const promise_collection = []
  applicants.forEach(async (applicant) => {
    const applicant_uid =  applicant["UID"];
      promise_collection.push(await createApplication(String(generateRandomUID(16)), applicant_uid))
  });
  return await Promise.all([...promise_collection]).then((result)=>{
    return "created applications"
  }).catch((e)=>{
    return e
  })

}

export async function is_complete_pre(){

}