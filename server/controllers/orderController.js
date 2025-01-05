import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Global variables
const currency = 'usd';
const deliveryCharge = 10;

// Stripe initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//----------------- COD Method -----------------
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        console.log("COD order received:", { userId, amount, address, items }); // Debug log

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        console.log("Order saved successfully:", newOrder); // Debug log

        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        console.log("User cart cleared for userId:", userId); // Debug log

        res.json({ success: true, message: "Order placed" });
    } catch (error) {
        console.error("Error placing COD order:", error); // Debug log
        res.json({ success: false, message: error.message });
    }
};

//----------------- Stripe Method -----------------
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;
        console.log("Stripe order received:", { userId, amount, address, items }); // Debug log

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();
        console.log("Order saved successfully for Stripe:", newOrder); // Debug log

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges',
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        });

        console.log("Line items created for Stripe:", line_items); // Debug log

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        });
        console.log("Stripe session created:", session); // Debug log

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error in Stripe order:", error); // Debug log
        res.json({ success: false, message: error.message });
    }
};

//----------------- Stripe Verification -----------------
const verifyStripe = async (req, res) => {
    const { orderId, success } = req.body;
    const userId = req.body.userId; // From authUser middleware

    console.log("Verification request received:", { orderId, success, userId }); // Debug log

    try {
        if (!userId) {
            console.error("User authentication failed"); // Debug log
            return res.status(401).json({
                success: false,
                message: "User authentication failed",
            });
        }

        if (success === "true") {
            const order = await orderModel.findById(orderId);
            if (!order) {
                console.error("Order not found for ID:", orderId); // Debug log
                return res.status(404).json({
                    success: false,
                    message: "Order not found",
                });
            }

            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });

            console.log("Payment verified successfully for orderId:", orderId); // Debug log
            return res.json({
                success: true,
                message: "Payment verified successfully",
            });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            console.warn("Payment verification failed for orderId:", orderId); // Debug log
            return res.json({
                success: false,
                message: "Payment verification failed",
            });
        }
    } catch (error) {
        console.error("Error during Stripe verification:", error); // Debug log
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

//----------------- Other Functions -----------------
const placeOrderRazorpay = async (req, res) => {
    // Placeholder for Razorpay integration
};

const allOrders = async (req, res) => {
    try {
        console.log("Fetching all orders"); // Debug log
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching all orders:", error); // Debug log
        res.json({ success: false, message: error.message });
    }
};

const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log("Fetching orders for userId:", userId); // Debug log
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching user orders:", error); // Debug log
        res.json({ success: false, message: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        console.log("Updating order status:", { orderId, status }); // Debug log
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.error("Error updating order status:", error); // Debug log
        res.json({ success: false, message: error.message });
    }
};

export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus,
    verifyStripe,
};
