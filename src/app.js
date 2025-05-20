import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookie from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import crudRoutes from "./routes/crud.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookie());


app.use('/auth',authRoutes);
app.use('/crud',crudRoutes);
app.use('/cart',cartRoutes);
app.use('/order',orderRoutes);

export default app;