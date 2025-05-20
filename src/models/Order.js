import mongoose  from "mongoose";

const itemsOrderSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Items",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    price:{
        type:Number,
        required:true
    }
});

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    items:[itemsOrderSchema],
    total:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending","rejected","aproved"],
        default:"pending"
    },
},
{timestamps:true}
);

const Order =  mongoose.model("Order",orderSchema);
export default Order;