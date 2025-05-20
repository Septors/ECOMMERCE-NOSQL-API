import Cart from "../models/Cart.js";

export const findUserCart = async (userId) =>{
    try{
        return await Cart.findOne(userId);
        
    }  catch(err){
        console.error(err);
    }
}