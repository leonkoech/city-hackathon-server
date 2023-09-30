import { createApplicantsFirebase } from "./firebase.mjs";
import { generateRandomApplicants } from "./utility.mjs";

export async function createApplicants(applicantNumber){
const applicants = generateRandomApplicants(applicantNumber);
return await createApplicantsFirebase(applicants)
}
  