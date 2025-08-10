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
            if (!credentials?.email || !credentials?.password) {
              return null
            }

            const normalizedEmail = String(credentials.email).toLowerCase().trim()
            const providedPassword = String(credentials.password)
            
            await connectDb()
            
            const user = await User.findOne({ email: normalizedEmail })
            
            if (user && user.password === providedPassword) {
              return {
                id: user._id.toString(),
                email: user.email,
                name: user.username
              }
            }
            
            return null
          } catch (error) {
            console.error('Auth error:', error.message)
            return null
          }
        }
      })
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id
          token.username = user.name
        }
        return token
      },
      
      async session({ session, token }) {
        if (token) {
          session.user.id = token.id
          session.user.name = token.username
        }
        return session
      },
    } 
  }

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }