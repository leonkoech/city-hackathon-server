import express from "express"
import { fetchApplicants, fetchApplications, SetApproval, SetProvidedDocumentation, updateDocumentation } from './services/firebase.mjs';
import {createApplicants} from "./services/applicant.mjs";
import { createApplications } from "./services/application.mjs";

const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('you\'re on application test db');
});

// app.get("/create_applicants",  async (req, res) => {
//   const result = await createApplicants(30);
//   console.log(result)
//   res.send(JSON.stringify(result));
// });

// app.get("/create_applications",  async (req, res) => {
//   const result = await createApplications();
//   console.log(result)
//   res.send({data:result});
// });

app.get('/applicants', async (req, res) => {
  const applicants = await fetchApplicants();
  // res.send({data:applicants})
  res.status(201).json({ message: 'applicants fetched successfully', data: applicants });
});

app.get('/applications', async (req, res) => {
  const applications = await fetchApplications();
  // res.send({data:applications})
  res.status(201).json({ message: 'applications fetched successfully', data: applications });
});

app.post('/setApproval', async (req, res) => {
  const { data } = req;
  const UID = data.uid;
  const is_approved= data.is_approved;
  const application = await SetApproval(is_approved, UID)

  res.status(201).json({ message: 'approval set successfully', data: application });
});

app.post('/updateDocuments', async (req, res) => {
  const { data } = req;
  const application_id = data.application_id;
  const document_id = data.document_id;
  const is_submitted = data.is_submitted;

  const documents = await updateDocumentation(application_id, document_id, is_submitted)

  res.status(201).json({ message: 'Data received successfully', data: documents });
});


app.get('/test', async (req, res) => {
  const application_id = "04htle2Yb5RExEov";
  const document_id = "w2";
  const is_submitted = true;

  const documents = await updateDocumentation(application_id, document_id, is_submitted)

  res.status(201).json({ message: 'Data received successfully', data: documents });
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

