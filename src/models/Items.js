import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type: String, required:true},
    price: {type:Number, required:true},
    category: {type:String},
    stock: {type: Number, default:0}
},
{timestamps:true},
);

const Items = mongoose.model("Items",itemSchema);
export default Items;