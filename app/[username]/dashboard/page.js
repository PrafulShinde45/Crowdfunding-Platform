import React from 'react'
import CreatorDashboard from '@/components/CreatorDashboard'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb'
import User from '@/models/User'

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
      <Navbar />
      <CreatorDashboard username={params.username} creatorData={creator} />
      <Footer />
    </>
  )
}

export default CreatorDashboardPage

export async function generateMetadata({ params }) {
  return {
    title: `${params.username}'s Dashboard - FundForge`,
  }
}
