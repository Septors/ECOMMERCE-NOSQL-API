import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const start = () =>{
    connectDB();

    app.listen(PORT,() =>{
        console.log(`Server runing in PORT: ${PORT}`);
    })
}
start();