import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGODB_URI){
    throw new Error("PLEASE PROVIDE MONGODB URI IN THE .ENV FILE"); 
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
         console.log("Connected to database")
    } catch (error) {
        console.log("Failed to connect" , error)
        process.exit(1)
    }
}

export default connectDB