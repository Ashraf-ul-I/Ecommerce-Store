import express from "express";
import dotenv from "dotenv"
import authRoutes from './routes/auth.routes.js'
import productsRoutes from './routes/products.routes.js'
import { connectDb } from "./db/connectDb.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app=express();
app.use(express.json());
app.use(cookieParser());
const PORT=process.env.PORT||5000;


app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/products',productsRoutes);


app.listen(PORT,()=>{

    console.log(`server is running on http://localhost:${PORT}`)
    connectDb();
})