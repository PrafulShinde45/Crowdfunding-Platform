
import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
        console.log('🔍 [VERCEL BUILD] Database connection attempt started');
        console.log('🔍 [VERCEL BUILD] Environment check:', {
            MONGO_URI: process.env.MONGO_URI ? 'Set' : 'NOT SET',
            NODE_ENV: process.env.NODE_ENV || 'Not Set'
        });
        
        // In serverless environments, check if mongoose is already connected
        if (mongoose.connections[0].readyState === 1) {
            console.log('✅ [VERCEL BUILD] Using existing database connection');
            console.log(`📊 [VERCEL BUILD] Connection Status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
            console.log(`🌐 [VERCEL BUILD] Database: ${mongoose.connection.name || 'Unknown'}`);
            console.log(`🏠 [VERCEL BUILD] Host: ${mongoose.connection.host || 'Unknown'}`);
            return;
        }
        
        try {
            console.log('🔍 [VERCEL BUILD] Attempting to connect to MongoDB...');
            if (!process.env.MONGO_URI) {
                console.error('❌ [VERCEL BUILD] MONGO_URI is not defined in environment variables');
                throw new Error('MONGO_URI is not defined in environment variables');
            }
            console.log('🔍 [VERCEL BUILD] MONGO_URI found, attempting connection...');
            
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                serverSelectionTimeoutMS: 10000, // 10 second timeout for production
                socketTimeoutMS: 45000, // 45 second timeout
                maxPoolSize: 10, // Maintain up to 10 socket connections
                retryWrites: true,
            });
            
            isConnected = true;
            console.log(`✅ [VERCEL BUILD] MongoDB Connected Successfully!`);
            console.log(`🏠 [VERCEL BUILD] Host: ${conn.connection.host}`);
            console.log(`📊 [VERCEL BUILD] Database Name: ${conn.connection.name}`);
            console.log(`🔌 [VERCEL BUILD] Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
            console.log(`⏱️ [VERCEL BUILD] Connection Time: ${new Date().toISOString()}`);
            console.log(`🔍 [VERCEL BUILD] Connection string preview: ${process.env.MONGO_URI.substring(0, 20)}...`);
            return conn;
            
        } catch (error) {
            console.error('❌ [VERCEL BUILD] MongoDB Connection Error:', error.message);
            console.error('❌ [VERCEL BUILD] Error details:', {
                name: error.name,
                code: error.code,
                message: error.message
            });
            console.error('❌ [VERCEL BUILD] Please check your MONGO_URI in Vercel environment variables');
            throw error; // Don't exit process, let the calling function handle it
        }
    }

  export default connectDb;