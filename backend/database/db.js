import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async() => {
    try {
        const MONGO_URI  ="mongodb+srv://rakshith077:rakshith2006@cluster0.wsogqbt.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";
        console.log("MONGO_URI:", MONGO_URI);
        if(!MONGO_URI){
            throw new Error("MONGO_URI is not defined");
        }

        await mongoose.connect(MONGO_URI)
        console.log("MongoDB connected Successfully");
    } catch (error) {
        console.log("MongoDB connection error", error);
        
    }
}

export default connectDB;