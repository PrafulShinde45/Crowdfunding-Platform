import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import mongoose from "mongoose";
import connectDb from '@/db/connectDb';
import User from '@/models/User';
import Payment from '@/models/Payment';
 

const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    session: { strategy: 'jwt' },
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
              console.log('Missing email or password in credentials')
              return null
            }

            const normalizedEmail = String(credentials.email).toLowerCase().trim()
            const providedPassword = String(credentials.password)

            console.log('Auth attempt for email:', normalizedEmail)
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
            console.error('Auth error:', error)
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
          await connectDb()
          const dbUser = await User.findOne({email: session.user.email})
          if (dbUser) {
            session.user.name = dbUser.username
            session.user.id = dbUser._id.toString()
          } else {
            session.user.name = session.user.email.split("@")[0]
          }
          return session
        } catch (error) {
          console.error('Session error:', error)
          session.user.name = session.user.email.split("@")[0]
          return session
        }
      },
    } 
  }

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }