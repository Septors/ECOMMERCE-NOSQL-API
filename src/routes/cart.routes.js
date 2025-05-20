import express from "express";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import * as cartcontroller from "../controllers/cart.controller.js";


const cartRoutes = express.Router();

cartRoutes.get('/cart',authMiddleware.verifyAccessToken,cartcontroller.getCart);
cartRoutes.post('/cart',authMiddleware.verifyAccessToken,cartcontroller.addToCart);
cartRoutes.delete('/cart',authMiddleware.verifyAccessToken,cartcontroller.ClearCart);
cartRoutes.delete('/cart/:id',authMiddleware.verifyAccessToken,cartcontroller.clearItems);


export default cartRoutes;