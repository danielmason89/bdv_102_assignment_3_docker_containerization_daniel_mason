import ShoppingCart from '../models/shoppingcartModel.js';
import ShoppingCartItem from '../models/shoppingcartitemModel.js';
import Product from '../models/productModel.js';

// GET /api/cart/:cartId → get items in cart
export const getCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    // Find cart items along with product details
    const cartItems = await ShoppingCartItem.findAll({
      where: { cart_id: cartId },
      include: [Product] // so we can see product name, price, etc.
    });

    if (!cartItems) {
      return res.status(404).json({ message: 'Cart not found or empty' });
    }

    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/cart/:cartId/add → add product to cart
export const addToCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { product_id, quantity } = req.body;

    // Ensure the cart exists
    const cart = await ShoppingCart.findByPk(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Check if item already exists in the cart
    let cartItem = await ShoppingCartItem.findOne({
      where: { cart_id: cartId, product_id }
    });

    if (cartItem) {
      // If item already in cart, update quantity
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      // Otherwise, create a new item
      cartItem = await ShoppingCartItem.create({
        cart_id: cartId,
        product_id,
        quantity: quantity || 1
      });
    }

    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/cart/:cartId/remove/:productId → remove product from cart
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
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/cart/:cartId/quantity → adjust quantity
export const updateCartItemQuantity = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { product_id, quantity } = req.body;

    // Validate quantity
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

    // Update quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
