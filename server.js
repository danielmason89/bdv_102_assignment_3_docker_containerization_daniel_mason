import express from "express";
import dotenv from "dotenv"; 
import cors from "cors";
import pg from "pg";
import cartRouter from "./routes/cartRoutes.js";
import customerRouter from "./routes/customerRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

// import orderRouter from "./routes/orderRoutes.js";

const app = express();
dotenv.config();
const { Pool } = pg;
const PORT = process.env.PORT || 4000;

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
app.use('/api/orders', orderRouter);
app.use('/api/cart', cartRouter);
app.use('/api/customers', customerRouter);
app.use('/api/products', productRouter);

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