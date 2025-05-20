import express from "express";
import { crudValidate } from "../middlewares/crud.middlewares.js";
import * as authMiddleware from "../middlewares/auth.middleware.js";
import * as crudController from "../controllers/crud.controller.js"

const crudRoutes = express.Router();

crudRoutes.get('/items',authMiddleware.verifyAccessToken,crudController.getAllItems);
crudRoutes.get('/items/:id',authMiddleware.verifyAccessToken,crudController.findItemsById);
crudRoutes.post('/items',crudValidate,authMiddleware.verifyAccessToken,authMiddleware.checkRole('admin'),crudController.createItems);
crudRoutes.put('/items/:id',crudValidate,authMiddleware.verifyAccessToken,authMiddleware.checkRole('admin'),crudController.updateItems);
crudRoutes.delete('/items/:id',authMiddleware.verifyAccessToken,authMiddleware.checkRole('admin'),crudController.deleteItems);

export default crudRoutes;