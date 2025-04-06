import express from "express";
import dotenv from "dotenv"; 
import cors from "cors";
import sequelize from "./config/database.js"; 

import cartRouter from "./routes/cartRoutes.js";
import customerRouter from "./routes/customerRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/orders', orderRouter);
app.use('/api/cart', cartRouter);
app.use('/api/customers', customerRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Swift Cart E-commerce API!');
});

// Catch-all for 404
app.use((req, res) => {
  res.status(404).json({ message: "Error, This path doesn't exit"})
});

// Connect to DB and start server
sequelize.sync()
  .then((result) => {
    console.log('Database synced!');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync DB:', err);
  });