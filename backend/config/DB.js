import mongoose from "mongoose";
import 'dotenv/config'

export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_url) 
        console.log("MongoDB connected")
    } catch (error) {
        console.log("MongoDB not connected",error)
    }
}