import mongoose from "mongoose";
import * as cartService from "../services/cart.services.js"
import Cart from "../models/Cart.js";
import Items from "../models/Items.js"; 

export const getCart = async (req,res) =>{
    try{
        const user = req.user;
        console.log(user)
        const cartExist = await Cart.findOne({user})
        res.status(200).json({Message: "Cart user",cartExist});
    } catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error"});
    }
}



export const addToCart = async(req,res) =>{
    try{
        const user = req.user;

        if(!user){
            return res.status(404).json({Error: "User not found"});
        };


        const{productId,quantity} = req.body;

        const cartExist = await  cartService.findUserCart({user});

        const findProduct = await Items.findById(productId);
        const price = findProduct.price;

        if(cartExist){

            const itemExist = cartExist.items.findIndex(item => item.product.toString()=== productId);

            if(itemExist > -1){
                cartExist.items[itemExist].quantity += quantity;

            }else{
                cartExist.items.push({product:productId,quantity,price})
            };

            await cartExist.save();

        }else if(!cartExist){
            const newItems = await  Cart.create({
                user:user,
                items:[{
                    product: productId,
                    quantity,
                    price:price
                }]
            });
            await newItems.save();
        }
        res.status(201).json({Message: "Items added"});
    }catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error"});
        };
};

export const ClearCart = async(req,res) =>{
    try{
        const user = req.user;
        if(!user){
            return res.status(404).json({Error: "User not found"});
        };

        const existCart = await cartService.findUserCart({user});
        if(!existCart){
            return res.status(404).json({Error: "Cart not created"});
        };

        if(existCart.items.length > 0){
        existCart.items = [];
        await existCart.save();
        }


        res.status(200).json({Message: "Cart cleared"});
    }catch(err){
        console.error(err);
        res.status(500).json({Error: "Server error"});
    };
};

export const clearItems = async(req,res) =>{
    try{
        const {id} = req.params;

        const user = req.user;

        const cart = await cartService.findUserCart({user});
        
        if(!cart){
            return res.status(404).json({Error: "Cart in not found"});
        };

        const productExist = cart.items.findIndex(item => item.product.toString() === id);

        if(productExist>-1){
         cart.items = cart.items.filter(item => item.product.toString() !== id );
        await cart.save();
        }else{
           return  res.status(404).json({Error: "Product not found"});
        };


        res.status(200).json({Message: "Items deleted by cart"})
    }catch(err){
        console.error(err);
        res.status(500).json({Message: "Server error"});
    }
} 


