import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Items",
        required:true

    },
    quantity:{
        type: Number,
        required:true,
        default:0
    },
    price: {
    type: Number,
    required: true,
  }
});



const cartSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
        unique: true
    },
    items: [cartItemSchema],
},
    { timestamps:true,}    
)

const Cart = mongoose.model("Cart",cartSchema);

export default Cart;