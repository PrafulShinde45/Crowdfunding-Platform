import { NextResponse } from 'next/server';

export async function GET() {
  // Temporarily enable debug in production to troubleshoot
  // TODO: Disable this after fixing the issue
  // if (process.env.NODE_ENV === 'production' && !process.env.ENABLE_DEBUG) {
  //   return NextResponse.json({ 
  //     message: 'Debug endpoint disabled in production',
  //     hint: 'Set ENABLE_DEBUG=true to enable this endpoint'
  //   }, { status: 403 });
  // }

  const envCheck = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'Not Set',
    critical: {
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ NOT SET',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL ? '✅ Set' : '❌ NOT SET',
      MONGO_URI: process.env.MONGO_URI ? '✅ Set' : '❌ NOT SET'
    },
    auth: {
      NEXTAUTH_SECRET_LENGTH: process.env.NEXTAUTH_SECRET?.length || 0,
      NEXTAUTH_URL_VALUE: process.env.NEXTAUTH_URL || 'Not Set'
    },
    database: {
      MONGO_URI_PREVIEW: process.env.MONGO_URI ? 
        `${process.env.MONGO_URI.substring(0, 20)}...` : 'Not Set'
    }
  };

  return NextResponse.json(envCheck);
}
