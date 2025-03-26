import express from "express";
import dotenv from "dotenv"
import authRoutes from './routes/auth.routes.js'
import productsRoutes from './routes/products.routes.js'
import cartRoutes from './routes/cart.routes.js'
import couponRoutes from './routes/coupon.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import { connectDb } from "./db/connectDb.js";
import cookieParser from "cookie-parser";
import analyticsRoutes from './routes/analytics.routes.js'
dotenv.config();

const app=express();
app.use(express.json({limit:"10mb"}));
app.use(cookieParser());
const PORT=process.env.PORT||5000;


app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/products',productsRoutes);
app.use('/api/v1/cart',cartRoutes);
app.use('/api/v1/coupons',couponRoutes);
app.use('/api/v1/payments',paymentRoutes);
app.use('/api/v1/analytacs',analyticsRoutes)
app.listen(PORT,()=>{

    console.log(`server is running on http://localhost:${PORT}`)
    connectDb();
})