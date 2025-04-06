import ShoppingCart from '../models/shoppingcartModel.js';
import ShoppingCartItem from '../models/shoppingcartitemModel.js';
import Product from '../models/productModel.js';

/**
 * POST /api/cart
 * Creates a new shopping cart for a given user.
 */
export const createCart = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: 'user_id is required' });
    }

    const newCart = await ShoppingCart.create({ user_id });
    return res.status(201).json(newCart);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * GET /api/cart/:cartId
 * Fetches items in the given shopping cart, including product details.
 */
export const getCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    // Find cart items along with product details
    const cartItems = await ShoppingCartItem.findAll({
      where: { cart_id: cartId },
      include: [Product]
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: 'Cart not found or empty' });
    }

    return res.json(cartItems);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * POST /api/cart/:cartId/add
 * Adds a product to the cart, or increases quantity if product is already in the cart.
 */
export const addToCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { product_id, quantity } = req.body;

    if (!product_id) {
      return res.status(400).json({ message: 'product_id is required' });
    }

    // Ensure the cart exists
    const cart = await ShoppingCart.findByPk(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Check if the product exists
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If quantity not provided, default to 1
    const qty = quantity || 1;

    // Check if there's enough stock
    if (product.quantity_in_stock < qty) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Check if item already exists in the cart
    let cartItem = await ShoppingCartItem.findOne({
      where: { cart_id: cartId, product_id }
    });

    if (cartItem) {
      // If item already in cart, update quantity
      const newQuantity = cartItem.quantity + qty;

      // Check stock again
      if (product.quantity_in_stock < newQuantity) {
        return res.status(400).json({ message: 'Insufficient stock to add more' });
      }
      cartItem.quantity = newQuantity;
      await cartItem.save();
    } else {
      // Otherwise, create a new item
      cartItem = await ShoppingCartItem.create({
        cart_id: cartId,
        product_id,
        quantity: qty
      });
    }

    return res.json(cartItem);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE /api/cart/:cartId/remove/:productId
 * Removes a specific product from the cart entirely.
 */
export const removeFromCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const cartItem = await ShoppingCartItem.findOne({
      where: { cart_id: cartId, product_id: productId }
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    await cartItem.destroy();
    return res.json({ message: 'Item removed from cart' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/**
 * PATCH /api/cart/:cartId/quantity
 * Adjusts the quantity of a single product in the cart.
 */
export const updateCartItemQuantity = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { product_id, quantity } = req.body;

    if (!product_id || !quantity) {
      return res.status(400).json({ message: 'product_id and quantity are required' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    // Check if item exists in the cart
    const cartItem = await ShoppingCartItem.findOne({
      where: { cart_id: cartId, product_id }
    });
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Check product stock
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.quantity_in_stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Update quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    return res.json(cartItem);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
