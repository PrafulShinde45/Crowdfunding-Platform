// This script runs during Vercel build to test database connectivity
import mongoose from 'mongoose';

console.log('🔍 [VERCEL BUILD] Starting database connectivity test...');

async function testDatabaseConnection() {
    try {
        console.log('🔍 [VERCEL BUILD] Environment variables check:');
        console.log('🔍 [VERCEL BUILD] - MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'NOT SET');
        console.log('🔍 [VERCEL BUILD] - NODE_ENV:', process.env.NODE_ENV || 'Not Set');
        
        if (!process.env.MONGO_URI) {
            console.error('❌ [VERCEL BUILD] MONGO_URI not found - database connection will fail!');
            return false;
        }

        console.log('🔍 [VERCEL BUILD] Attempting to connect to MongoDB...');
        
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });

        console.log('✅ [VERCEL BUILD] Database connection successful!');
        console.log('🏠 [VERCEL BUILD] Connected to:', conn.connection.host);
        console.log('📊 [VERCEL BUILD] Database:', conn.connection.name);
        
        // Test a simple operation
        const collections = await conn.connection.db.listCollections().toArray();
        console.log('📚 [VERCEL BUILD] Available collections:', collections.map(c => c.name));
        
        await mongoose.disconnect();
        console.log('✅ [VERCEL BUILD] Database test completed successfully');
        return true;
        
    } catch (error) {
        console.error('❌ [VERCEL BUILD] Database connection test failed:');
        console.error('❌ [VERCEL BUILD] Error:', error.message);
        console.error('❌ [VERCEL BUILD] Error code:', error.code);
        console.error('❌ [VERCEL BUILD] This will cause authentication failures!');
        return false;
    }
}

// Run the test
testDatabaseConnection();
