import express from "express"
import * as orderController from "../controllers/order.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const orderRoutes = express.Router();

orderRoutes.post('/order',authMiddleware.verifyAccessToken,orderController.cartOrder);

export default orderRoutes;