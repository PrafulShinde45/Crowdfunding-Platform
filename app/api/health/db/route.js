import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDb from '@/db/connectDb';

export async function GET() {
  try {
    const healthCheck = {
      timestamp: new Date().toISOString(),
      status: 'checking',
      database: {
        connected: false,
        readyState: null,
        host: null,
        name: null,
        collections: [],
        error: null
      },
      environment: {
        mongoUri: process.env.MONGO_URI ? 'Set' : 'Not Set',
        nodeEnv: process.env.NODE_ENV || 'Not Set'
      }
    };

    // Check if MONGO_URI is set
    if (!process.env.MONGO_URI) {
      healthCheck.status = 'error';
      healthCheck.database.error = 'MONGO_URI environment variable not set';
      return NextResponse.json(healthCheck, { status: 500 });
    }

    try {
      // Try to connect
      await connectDb();
      
      // Get connection details
      const connection = mongoose.connection;
      healthCheck.database.connected = connection.readyState === 1;
      healthCheck.database.readyState = connection.readyState;
      healthCheck.database.host = connection.host;
      healthCheck.database.name = connection.name;

      // Test basic operations
      if (connection.readyState === 1) {
        try {
          // Get list of collections
          const collections = await connection.db.listCollections().toArray();
          healthCheck.database.collections = collections.map(col => col.name);
          
          // Test a simple query
          const dbStats = await connection.db.stats();
          healthCheck.database.stats = {
            collections: dbStats.collections,
            dataSize: dbStats.dataSize,
            storageSize: dbStats.storageSize
          };
          
          healthCheck.status = 'healthy';
        } catch (queryError) {
          healthCheck.status = 'warning';
          healthCheck.database.error = `Connected but query failed: ${queryError.message}`;
        }
      } else {
        healthCheck.status = 'error';
        healthCheck.database.error = `Connection failed. ReadyState: ${connection.readyState}`;
      }

    } catch (connectionError) {
      healthCheck.status = 'error';
      healthCheck.database.error = connectionError.message;
    }

    const statusCode = healthCheck.status === 'healthy' ? 200 : 
                      healthCheck.status === 'warning' ? 200 : 500;

    return NextResponse.json(healthCheck, { status: statusCode });

  } catch (error) {
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      status: 'error',
      error: error.message
    }, { status: 500 });
  }
}
