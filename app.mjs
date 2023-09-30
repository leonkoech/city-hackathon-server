import express from "express"
import { fetchApplicants } from './services/firebase.mjs';
import {create_applicants} from "./services/applicant.mjs";

const app = express();




// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
  //test_database();
  fetchUsers();
});

app.get("/create_applicants",  async (req, res) => {
  // res.send('Hello, World!');
  //test_database();
  const result = await create_applicants(30);
  console.log(result)
  res.send(JSON.stringify(result));
});

app.get('/applicants', async (req, res) => {
  //test_database();
  const applicants = await fetchUsers();
  res.send(JSON.stringify(applicants))
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

