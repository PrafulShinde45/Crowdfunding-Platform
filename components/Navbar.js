"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  const { data: session } = useSession()


  return (
    <nav className='bg-black shadow-xl shadow-red-500/20 text-white flex justify-between items-center px-4 md:h-16 border-b border-red-500/30'>

      <Link className="logo font-bold text-lg flex justify-center items-center" href={"/"}>
        <div className='w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center mr-2 shadow-lg'>
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 2a1 1 0 100 2h2a1 1 0 100-2h-2z" clipRule="evenodd" />
          </svg>
        </div>
        <span className='text-xl md:text-base my-3 md:my-0 bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent font-extrabold'>FundForge</span>
      </Link>

      {/* <ul className='flex justify-between gap-4'>
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>Sign Up</li>
        <li>Login</li>
      </ul> */}

      <div className='relative flex justify-center items-center  md:block gap-4'>
        {session && (
          <>
            <Link href="/dashboard">
              <button className='text-white bg-gradient-to-br from-black via-gray-900 to-red-900/30 hover:from-gray-900 hover:to-red-800/50 border border-red-500/20 hover:border-red-500/40 focus:ring-2 focus:outline-none focus:ring-red-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 transition-all duration-200 shadow-lg hover:shadow-red-500/25'>Dashboard</button>
            </Link>
            
            <Link href={`/${session.user.name}`}>
              <button className='text-white bg-gradient-to-br from-black via-gray-900 to-red-900/30 hover:from-gray-900 hover:to-red-800/50 border border-red-500/20 hover:border-red-500/40 focus:ring-2 focus:outline-none focus:ring-red-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 transition-all duration-200 shadow-lg hover:shadow-red-500/25'>Profile</button>
            </Link>
            
            <button className='text-white bg-gradient-to-br from-black via-gray-900 to-red-900/30 hover:from-gray-900 hover:to-red-800/50 border border-red-500/20 hover:border-red-500/40 focus:ring-2 focus:outline-none focus:ring-red-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 transition-all duration-200 shadow-lg hover:shadow-red-500/25' onClick={() => { signOut({ callbackUrl: '/' }) }}>Logout</button>
          </>
        )}
        {!session && (
          <div className="flex gap-2">
            <Link href="/signup">
              <button className='text-white bg-gradient-to-br from-black via-gray-900 to-red-900/30 hover:from-gray-900 hover:to-red-800/50 border border-red-500/20 hover:border-red-500/40 focus:ring-2 focus:outline-none focus:ring-red-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 transition-all duration-200 shadow-lg hover:shadow-red-500/25'>Sign Up</button>
            </Link>
            <Link href="/login">
              <button className='text-white bg-gradient-to-br from-black via-gray-900 to-red-900/30 hover:from-gray-900 hover:to-red-800/50 border border-red-500/20 hover:border-red-500/40 focus:ring-2 focus:outline-none focus:ring-red-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 transition-all duration-200 shadow-lg hover:shadow-red-500/25'>Login</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
