import express from "express"
import { test_database } from './services/firebase.mjs';

const app = express();




// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
  test_database();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});