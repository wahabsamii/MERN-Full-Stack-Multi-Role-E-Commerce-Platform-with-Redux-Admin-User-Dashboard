import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  UPdateStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.patch("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);
router.put("/update/:id", UPdateStatus);

export default router;


// // backend/routes/checkout.js
// import express from 'express';
// import Stripe from 'stripe';
// const router = express.Router();

// const stripe = Stripe('secret_key');

// router.post('/create-checkout-session', async (req, res) => {
//   const { cartItems } = req.body;

//   try {
//     const lineItems = cartItems.map(item => ({
//       price_data: {
//         currency: 'usd',
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: Math.round(item.price * 100), // in cents
//       },
//       quantity: item.quantity,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: lineItems,
//       mode: 'payment',
//       success_url: `${process.env.CLIENT_URL}/success`,
//       cancel_url: `${process.env.CLIENT_URL}/cancel`,
//     });

//     res.json({ url: session.url });

//   } catch (error) {
//     console.error('Stripe checkout error:', error);
//     res.status(500).json({ error: 'Failed to create checkout session' });
//   }
// });

// export default router;
