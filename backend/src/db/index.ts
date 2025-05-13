import mongoose from "mongoose";
import { DB_NAME } from "../constants/constant.js";

const connectDB = async () => {
    try {
        const connectionResponse = await mongoose.connect(
            `${process.env.MONGO_URI}/${DB_NAME}`
        );
        console.log(
            `MongoDB connected successfully: ${connectionResponse.connection.host}`
        );
    } catch (error) {
        console.log("Error connecting to MongoDB", error);
        process.exit(1);
    }
};

export { connectDB };
