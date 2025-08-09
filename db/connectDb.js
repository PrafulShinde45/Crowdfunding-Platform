
import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
        // In serverless environments, check if mongoose is already connected
        if (mongoose.connections[0].readyState === 1) {
            console.log('✅ Using existing database connection');
            return;
        }
        
        try {
            if (!process.env.MONGO_URI) {
                throw new Error('MONGO_URI is not defined in environment variables');
            }
            
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 10000, // 10 second timeout for production
                socketTimeoutMS: 45000, // 45 second timeout
                maxPoolSize: 10, // Maintain up to 10 socket connections
                serverSelectionRetryDelayMS: 5000, // Keep trying to send operations for 5 seconds
                heartbeatFrequencyMS: 10000, // Check server status every 10 seconds
                retryWrites: true,
            });
            
            isConnected = true;
            console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
            return conn;
            
        } catch (error) {
            console.error('❌ MongoDB Connection Error:', error.message);
            console.error('Please check your MONGO_URI in .env file');
            throw error; // Don't exit process, let the calling function handle it
        }
    }

  export default connectDb;