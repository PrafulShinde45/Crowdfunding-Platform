import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import mongoose from "mongoose";
import connectDb from '@/db/connectDb';
import User from '@/models/User';
import Payment from '@/models/Payment';
 

const authOptions = {
    secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-production-debug',
    debug: process.env.NODE_ENV === 'development',
    session: { 
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
      signIn: '/login',
      error: '/login',
      signOut: '/',
    },
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          try {
            console.log('🔍 [VERCEL BUILD] Authentication attempt started');
            console.log('🔍 [VERCEL BUILD] Environment check:', {
              MONGO_URI: process.env.MONGO_URI ? 'Set' : 'NOT SET',
              NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'Set' : 'NOT SET'
            });
            
            if (!credentials?.email || !credentials?.password) {
              console.log('❌ [VERCEL BUILD] Missing email or password in credentials')
              return null
            }

            const normalizedEmail = String(credentials.email).toLowerCase().trim()
            const providedPassword = String(credentials.password)

            console.log('Auth attempt for email:', normalizedEmail)
            
            // Check environment variables
            if (!process.env.MONGO_URI) {
              console.error('MONGO_URI not found in environment variables')
              throw new Error('Database configuration error')
            }
            
            await connectDb()
            
            const user = await User.findOne({ email: normalizedEmail })
            console.log('User found:', user ? 'Yes' : 'No')
            
            if (user) {
              const isPasswordMatch = user.password === providedPassword
              console.log('Password match:', isPasswordMatch)
              if (isPasswordMatch) {
                console.log('Authentication successful for:', normalizedEmail)
                return {
                  id: user._id.toString(),
                  email: user.email,
                  name: user.username
                }
              }
            }
            console.log('Authentication failed for:', normalizedEmail)
            return null
          } catch (error) {
            console.error('Auth error:', error.message)
            // Don't expose detailed error to client
            return null
          }
        }
      })
    ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
         if (account?.provider === "credentials") {
           return true
         }
         return true
      },
      
      async session({ session, user, token }) {
        try {
          // Check if we have required environment variables
          if (!process.env.MONGO_URI) {
            console.error('MONGO_URI missing in session callback')
            session.user.name = session.user.email?.split("@")[0] || 'User'
            return session
          }
          
          await connectDb()
          const dbUser = await User.findOne({email: session.user.email})
          if (dbUser) {
            session.user.name = dbUser.username
            session.user.id = dbUser._id.toString()
          } else {
            session.user.name = session.user.email?.split("@")[0] || 'User'
          }
          return session
        } catch (error) {
          console.error('Session callback error:', error.message)
          // Provide fallback name to prevent session failure
          session.user.name = session.user.email?.split("@")[0] || 'User'
          return session
        }
      },
    } 
  }

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }