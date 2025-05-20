import express from "express";
import * as authController from "../controllers/auth.controller.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register",authMiddleware.validateMiddleware,authController.registerUser);
authRoutes.post("/login",authMiddleware.validateMiddleware,authController.login);
authRoutes.delete('/logout',authMiddleware.validateMiddleware,authController.logout);
authRoutes.post('/refresh',authMiddleware.validateMiddleware,authController.refresh);
authRoutes.put('/change-password',authMiddleware.validateMiddleware,authMiddleware.verifyAccessToken,authController.changePassword)

export default authRoutes;