import express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

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
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Define the root route
app.get('/', (req, res) => {
  res.send('Hello from the server siiiiiide!');
});

// Listen to the server
const PORT = 8090;
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
