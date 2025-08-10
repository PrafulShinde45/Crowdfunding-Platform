import React from 'react'
import CreatorDashboard from '@/components/CreatorDashboard'
import { Suspense, lazy } from 'react'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb'
import User from '@/models/User'

// Lazy load components for better performance
const Navbar = lazy(() => import('@/components/Navbar'))
const Footer = lazy(() => import('@/components/Footer'))

const CreatorDashboardPage = async ({ params }) => {
  // Check if the creator exists in the database
  const checkUser = async () => {
    try {
      await connectDb()
      let u = await User.findOne({ username: params.username })
      if (!u) {
        return notFound()
      }
      return u
    } catch (error) {
      console.error('Database error:', error)
      return notFound()
    }
  }
  
  const creator = await checkUser()

  return (
    <>
      <Suspense fallback={<div className="h-16 bg-gray-900 animate-pulse"></div>}>
        <Navbar />
      </Suspense>
      <CreatorDashboard username={params.username} creatorData={creator} />
      <Suspense fallback={<div className="h-32 bg-gray-900 animate-pulse"></div>}>
        <Footer />
      </Suspense>
    </>
  )
}

export default CreatorDashboardPage

export async function generateMetadata({ params }) {
  return {
    title: `${params.username}'s Dashboard - FundForge`,
  }
}
