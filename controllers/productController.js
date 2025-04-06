import Product from '../models/productModel.js';

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// GET product by id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json(product);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
