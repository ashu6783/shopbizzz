import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users",
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  address: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    default: "Order Placed",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  payment: {
    type: Boolean,
    default: false,
    required: true
  },
  date: {
    type: Number,
    required: true
  }
}, { timestamps: true }); // ✅ Adds createdAt & updatedAt fields automatically

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);
export default orderModel;
