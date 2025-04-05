import express from "express";
import dotenv from "dotenv"; 
import cors from "cors";
import pg from "pg";

// import orderRouter from "./routes/orderRoutes.js";

const app = express();
dotenv.config();
const { Pool } = pg;
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, DB_PORT } = process.env;
const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: DB_PORT,
  ssl: {
    require: true
  }
})

// Routes
// app.use('/api/orders', orderRouter);

// Test route to check if the server is running and database connection is working
app.get('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM product');
    const products = result.rows;
    console.log(products);
  } catch (errors) {
    console.log(errors)
  } finally {
    client.release()
  }
  res.send('Welcome to the Swift Cart E-commerce API!');
});

// Catch-all for 404
app.use((req, res) => {
  res.status(404).json({ message: "Error, This path doesn't exit"})
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});