// Import necessary modules
import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, 
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Define the root route
app.get('/', (req, res) => {
  res.send('Hello from the server side!');
});

// Define a /data route to fetch data from a table
app.get('/data', (req, res) => {
  const query = 'SELECT * FROM patients'; // SQL query to fetch all data from the table

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.status(500).send('Error retrieving data from the database');
    } else {
      res.json(results); // Send the retrieved data as a JSON response
    }
  });
});

// Listen to the server
const PORT = process.env.PORT || 8090; // Use port from .env or default to 8090
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
