import Cart from "../models/Cart.js";
import Order from "../models/Order.js";


export const cartOrder = async (req, res) => {
    try {
        const user = req.user;

        const cart = await Cart.findOne({ user }).populate('items');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty or not found" });
        }

        const items = cart.items;

        const total = items.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0);
        console.log(total)

        
        const order = await Order.create({
            user:user,
            items,
            total,
        });

        res.status(200).json({ Message: "Order created",order });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};