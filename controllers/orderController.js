import ShoppingCart from '../models/shoppingcartModel.js';
import ShoppingCartItem from '../models/shoppingcartitemModel.js';
import ShopOrder from '../models/shopOrderModel.js';
import OrderLine from '../models/orderLineModel.js';
import Product from '../models/productModel.js';

// POST /api/orders → place an order (move from cart to order)
export const placeOrder = async (req, res) => {
  /*
    Expected in req.body or query:
    - user_id (the user who is placing the order)
    - cart_id (the cart that is being converted to an order)
    - possibly shipping address, payment method, etc.
  */
  try {
    const { user_id, cart_id, payment_method_id, shipping_address_id } = req.body;

    // 1. Verify the cart exists and fetch items
    const cart = await ShoppingCart.findByPk(cart_id);
    if (!cart || cart.user_id !== user_id) {
      return res.status(400).json({ message: 'Invalid cart or user mismatch' });
    }

    // Get all items from this cart
    const cartItems = await ShoppingCartItem.findAll({
      where: { cart_id },
      include: [Product]
    });
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // 2. Calculate total
    let orderTotal = 0;
    cartItems.forEach(item => {
      orderTotal += item.quantity * parseFloat(item.Product.price);
    });

    // 3. Create order
    const newOrder = await ShopOrder.create({
      user_id,
      payment_method_id,
      shipping_address_id,
      order_status: 'PLACED', // or 'PENDING', etc.
      order_total: orderTotal
    });

    // 4. For each cart item, create an order line
    const orderLinePromises = cartItems.map(item => {
      return OrderLine.create({
        order_id: newOrder.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.Product.price
      });
    });

    await Promise.all(orderLinePromises);

    // 5. (Optional) clear the cart
    await ShoppingCartItem.destroy({ where: { cart_id } });

    // 6. Return the new order with line items
    const createdOrder = await ShopOrder.findByPk(newOrder.id, {
      include: [OrderLine]
    });

    return res.status(201).json({
      message: 'Order placed successfully',
      order: createdOrder
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// GET /api/orders/:id → fetch an existing order
export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await ShopOrder.findByPk(id, {
      include: [OrderLine]
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.json(order);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
