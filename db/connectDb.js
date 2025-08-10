
import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
        // In serverless environments, check if mongoose is already connected
        if (mongoose.connections[0].readyState === 1) {
            return;
        }
        
        try {
            if (!process.env.MONGO_URI) {
                throw new Error('MONGO_URI is not defined in environment variables');
            }
            
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 10000, // 10 second timeout for production
                socketTimeoutMS: 45000, // 45 second timeout
                maxPoolSize: 10, // Maintain up to 10 socket connections
                retryWrites: true,
            });
            
            isConnected = true;
            return conn;
            
        } catch (error) {
            console.error('MongoDB Connection Error:', error.message);
            throw error;
        }
    }

  export default connectDb;