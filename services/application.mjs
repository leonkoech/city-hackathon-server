import { fetchApplicants,createApplication, fetchDocument, APPLICANTS } from "./firebase.mjs";
import { generateRandomUID, containsBlankField } from "./utility.mjs";

export async function createApplications(){
  const applicants = await fetchApplicants();
  const promise_collection = []
  applicants.forEach(async (applicant) => {
    const applicant_uid =  applicant["UID"];
    const is_complete = !containsBlankField(applicant)
      promise_collection.push(await createApplication(String(generateRandomUID(16)), applicant_uid, is_complete))
  });
  return await Promise.all([...promise_collection]).then((result)=>{
    return "created applications"
  }).catch((e)=>{
    return e
  })

}

export async function is_complete_pre(applicant_uid){
  const applicant = await fetchDocument(APPLICANTS, applicant_uid)
  const applicant_data = applicant.data;
  return !containsBlankField(applicant_data)
}