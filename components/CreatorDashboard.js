"use client"
import React, { useEffect, useState } from 'react'
import { fetchuser, fetchallpayments } from '@/actions/useractions'
import { useRouter } from 'next/navigation'

const CreatorDashboard = ({ username, creatorData }) => {
    const router = useRouter()
    const [creator, setCreator] = useState(creatorData || {})
    const [payments, setPayments] = useState([])

    const getData = React.useCallback(async () => {
        try {
            let u = await fetchuser(username)
            setCreator(u)
            let dbpayments = await fetchallpayments(username)
            setPayments(dbpayments) 
        } catch (error) {
            console.error('Error fetching data:', error)
            setCreator(creatorData || {})
            setPayments([])
        }
    }, [username, creatorData])

    useEffect(() => {
        getData()
    }, [getData])

    const totalAmount = payments.reduce((a, b) => a + b.amount, 0)
    const completedPayments = payments.filter(p => p.done)

    return (
        <div className='container mx-auto py-5 px-6 min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900'>
            <div className="flex items-center justify-between mb-8">
                <h1 className='text-3xl font-bold text-white'>
                                                {username}&apos;s Dashboard
                </h1>
                <button 
                    onClick={() => router.push(`/${username}`)}
                    className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2'
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
                    </svg>
                    Back to Profile
                </button>
            </div>

            {/* Creator Info Card */}
            <div className="max-w-4xl mx-auto bg-black/80 backdrop-blur-lg rounded-lg p-8 shadow-2xl border border-red-500/30 mb-8">
                {/* Profile Section */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-red-900/50 rounded-full border-2 border-red-500/40 flex items-center justify-center shadow-xl">
                            {creator.profilepic ? (
                                <img 
                                    src={creator.profilepic} 
                                    alt="Profile" 
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                            ) : (
                                <div className='text-2xl font-bold text-red-500'>
                                    {username?.charAt(0)?.toUpperCase() || 'U'}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {creator.name || username}
                        </h2>
                        <p className="text-red-400 text-lg mb-2">@{username}</p>
                        {creator.email && (
                            <p className="text-gray-400">{creator.email}</p>
                        )}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-red-500/20">
                        <div className="text-3xl font-bold text-red-400 mb-2">
                            {payments.length}
                        </div>
                        <div className="text-sm text-gray-400 uppercase tracking-wide">
                            Total Donations
                        </div>
                    </div>
                    
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-red-500/20">
                        <div className="text-3xl font-bold text-red-400 mb-2">
                            ₹{totalAmount}
                        </div>
                        <div className="text-sm text-gray-400 uppercase tracking-wide">
                            Total Raised
                        </div>
                    </div>
                    
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-red-500/20">
                        <div className="text-3xl font-bold text-red-400 mb-2">
                            {completedPayments.length}
                        </div>
                        <div className="text-sm text-gray-400 uppercase tracking-wide">
                            Successful Payments
                        </div>
                    </div>
                </div>

                {/* Recent Donations */}
                <div className="bg-gray-900/30 rounded-lg border border-red-500/20">
                    <div className="p-6 border-b border-red-500/20">
                        <h3 className='text-xl font-bold text-white flex items-center gap-3'>
                            <div className='w-6 h-6 bg-red-600 rounded-lg flex items-center justify-center'>
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            Recent Donations
                        </h3>
                    </div>
                    
                    <div className="p-6">
                        {payments.length > 0 ? (
                            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                                {payments.slice(0, 10).map((payment, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">
                                                    {payment.name?.charAt(0)?.toUpperCase() || 'A'}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="text-white font-medium">{payment.name || 'Anonymous'}</div>
                                                {payment.message && (
                                                    <div className="text-gray-400 text-sm">{payment.message}</div>
                                                )}
                                                <div className="text-xs text-gray-500">
                                                    {new Date(payment.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-red-400 font-bold">₹{payment.amount}</div>
                                            <div className={`text-xs ${payment.done ? 'text-green-400' : 'text-yellow-400'}`}>
                                                {payment.done ? 'Completed' : 'Pending'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 11a1 1 0 102 0v2a1 1 0 10-2 0v-2zm1-3a1 1 0 011 1v.01a1 1 0 11-2 0V9a1 1 0 011-1z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <p className="text-gray-400 text-lg">No donations yet</p>
                                <p className="text-gray-500 text-sm">Support this creator to see their first donation!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatorDashboard
