
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// Global variables
const currency = 'usd';
const deliveryCharge = 10;

//-------------------GATEWAY INITIALIZATION-----------------
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//-----------------placing order using cod method----------------
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        res.json({ success: true, message: "Order placed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//-----------------placing order using stripe method----------------
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        });

       
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`, // This is correct
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        });
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



//------------------------------------verify stripe------------

const verifyStripe = async(req, res) => {
    const { orderId, success } = req.body;
    const userId = req.body.userId; // From authUser middleware
    
    console.log('Verification request received:', { 
        orderId, 
        success, 
        userId 
    }); // Debug log

    try {
        if (!userId) {
            console.log('No userId present'); // Debug log
            return res.status(401).json({ 
                success: false, 
                message: "User authentication failed" 
            });
        }

        if (success === "true") {
            // Find the order first to verify it exists
            const order = await orderModel.findById(orderId);
            if (!order) {
                console.log('Order not found:', orderId); // Debug log
                return res.status(404).json({
                    success: false,
                    message: "Order not found"
                });
            }

            // Update order and clear cart
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            
            console.log('Payment verified successfully'); // Debug log
            
            return res.json({ 
                success: true,
                message: "Payment verified successfully"
            });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            
            console.log('Payment verification failed'); // Debug log
            
            return res.json({ 
                success: false,
                message: "Payment verification failed"
            });
        }
    } catch (error) {
        console.error('Verification error:', error); // Debug log
        
        return res.status(500).json({ 
            success: false, 
            message: error.message || "Internal server error"
        });
    }
};



//-----------------placing order using Razorpay method----------------
const placeOrderRazorpay = async (req, res) => {};

//---------------All Orders data for Admin Panel------------------
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//---------------User Order data for frontend-------------------------
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await orderModel.find({ userId });
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

//--------------update order status from Admin Panel-----------------
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: 'Status Updated' });
    } catch (error) {
        console.log(error);
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
  verifyStripe
};
