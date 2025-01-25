import express from "express";
import dotenv from "dotenv"
import authRoutes from './routes/auth.routes.js'
import { connectDb } from "./db/connectDb.js";

dotenv.config();

const app=express();
app.use(express.json());

const PORT=process.env.PORT||5000;
app.use('/api/v1/auth',authRoutes);


app.listen(PORT,()=>{

    console.log(`server is running on http://localhost:${PORT}`)
    connectDb();
})