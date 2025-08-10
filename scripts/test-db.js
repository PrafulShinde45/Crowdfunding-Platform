// This script runs during Vercel build to test database connectivity
import mongoose from 'mongoose';

async function testDatabaseConnection() {
    try {
        if (!process.env.MONGO_URI) {
            return false;
        }
        
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        
        await mongoose.disconnect();
        return true;
        
    } catch (error) {
        return false;
    }
}

// Run the test
testDatabaseConnection();
