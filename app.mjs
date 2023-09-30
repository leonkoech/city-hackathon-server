import express from "express"
import { test_database, fetchUsers } from './services/firebase.mjs';
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('you\'re on application test db');
  test_database();
});

//fetch all applicants
app.get('/applicants', (req, res) => {
  res.send('getting applicant\'s info');
  fetchUsers();
})

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});