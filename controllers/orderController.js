import ShoppingCart from '../models/shoppingcartModel.js';
import ShoppingCartItem from '../models/shoppingcartitemModel.js';
import ShopOrder from '../models/shopOrderModel.js';
import OrderLine from '../models/orderLineModel.js';
import Product from '../models/productModel.js';
import sequelize from '../config/database.js';

/**
 * POST /api/orders
 * Places an order for a given user_id and cart_id.
 * Moves cart items to the order, calculates total, decrements product stock.
 */
export const placeOrder = async (req, res) => {
  try {
    const { user_id, cart_id, payment_method_id, shipping_address_id } = req.body;

    // 1. Verify the cart exists and belongs to the user
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

    const result = await sequelize.transaction(async (t) => {
      let orderTotal = 0;

      // 2. Check stock & calculate order total
      for (const item of cartItems) {
        const product = item.Product;
        // If stock is insufficient
        if (product.quantity_in_stock < item.quantity) {
          throw new Error(`Insufficient stock for product: ${product.name}`);
        }
        orderTotal += item.quantity * parseFloat(product.price);
      }

      // 3. Create the order
      const newOrder = await ShopOrder.create({
        user_id,
        payment_method_id,
        shipping_address_id,
        order_status: 'PLACED',
        order_total: orderTotal
      }, { transaction: t });

      // 4. For each cart item, create an order line & decrement stock
      for (const item of cartItems) {
        const product = item.Product;

        await OrderLine.create({
          order_id: newOrder.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: product.price
        }, { transaction: t });

        product.quantity_in_stock -= item.quantity;
        await product.save({ transaction: t });
      }

      // 5. Clear the cart items
      await ShoppingCartItem.destroy({ where: { cart_id } }, { transaction: t });

      return newOrder;
    });

    const createdOrder = await ShopOrder.findByPk(result.id, {
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

/**
 * GET /api/orders/:id
 * Fetches an existing order by its ID, including order lines.
 */
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
