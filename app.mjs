import express from "express"
import { fetchApplicants, fetchApplications } from './services/firebase.mjs';
import {createApplicants} from "./services/applicant.mjs";
import { createApplications } from "./services/application.mjs";


const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('you\'re on application test db');
  // test_database();
});

app.get("/create_applicants",  async (req, res) => {
  const result = await createApplicants(30);
  console.log(result)
  res.send(JSON.stringify(result));
});

app.get("/create_applications",  async (req, res) => {
  const result = await createApplications();
  console.log(result)
  res.send(JSON.stringify(result));
});

app.get('/applicants', async (req, res) => {
  const applicants = await fetchApplicants();
  res.send(JSON.stringify(applicants))
});

app.get('/applications', async (req, res) => {
  const applications = await fetchApplications();
  res.send(JSON.stringify(applications))
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

