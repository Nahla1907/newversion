import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST, // Your database host
  user: process.env.DB_USER, // Your database user
  password: process.env.DB_PASSWORD, // Your database password
  database: process.env.DB_NAME, // Your database name
  port: process.env.DB_PORT, // Your database port (default is 3306)
});

// Test the database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database.');
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error('Database connection failed: ' + error.stack);
  }
};

// Call the test function
testConnection();

export default pool;
