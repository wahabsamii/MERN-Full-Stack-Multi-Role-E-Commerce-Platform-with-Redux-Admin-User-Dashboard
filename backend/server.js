import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js"
import productRoutes from "./routes/productRoutes.js"
import categoryRoutes from "./routes/categoryRoute.js";
import orderRoutes from "./routes/orderRoute.js";
import Stripe from "stripe";
import cors from 'cors'
import path from "path";
import { fileURLToPath } from "url";

const stripe = new Stripe(process.env.STRIPE_SECRET);

const app = express();
const PORT = 5000;
app.use(cors({
  origin: ['http://localhost:3000'],
  // credentials: true, // optional, if you use cookies or authentication
}));

await mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connected"))
app.use(express.json()); // for JSON
app.use(express.urlencoded({ extended: true })); // for form data



// app.use("/uploads", express.static("uploads"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use('/api/orders', orderRoutes);


app.post("/api/checkout/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req,res) => {
  res.send("Running");
})
// app.listen(PORT, () => {
//     console.log("Server is runnig 5000");
// });

export default app;