import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Databse connected ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error in connecting Databse: ${error.message}`)
        process.exit(1)
    }
};