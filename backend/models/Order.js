import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  total: { type: Number, required: true },
  items: { type: Array, required: true },
  user: {type: mongoose.Schema.ObjectId, ref:"User"},
  paymentMethod: {
    type: String,
    enum: ['card', 'cod'],
    default: 'cod',
  },

  status: {
    type: String,
    enum: ['pending', 'approved', 'cancelled'],
    default: 'pending',
  },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
