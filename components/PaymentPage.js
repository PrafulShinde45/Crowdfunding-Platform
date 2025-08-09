"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"

const PaymentPage = ({ username }) => {
    const { data: session } = useSession()

    const [paymentform, setPaymentform] = useState({name: "", message: "", amount: ""})
    const [currentUser, setcurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = React.useCallback(async () => {
        try {
            let u = await fetchuser(username)
            setcurrentUser(u)
            let dbpayments = await fetchpayments(username)
            setPayments(dbpayments) 
        } catch (error) {
            console.error('Error fetching data:', error)
            // Set default values if database fails
            setcurrentUser({})
            setPayments([])
        }
    }, [username])

    useEffect(() => {
        getData()
    }, [getData])

    useEffect(() => {
        if(searchParams.get("paymentdone") == "true"){
        toast('Thanks for your donation!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            });
        }
     
    }, [searchParams])


    const pay = async (amount) => {
        // Get the order Id 
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        var options = {
            "key": currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "FundForge", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${window.location.origin}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#dc2626"
            }
        }

        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='min-h-screen bg-black'>
                {/* Professional Header Section */}
                <div className='relative bg-gradient-to-r from-black via-gray-900 to-black border-b border-red-500/20'>
                    {/* Background Pattern */}
                    <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(239,68,68,0.1)_0%,transparent_50%)]'></div>
                    
                    {/* Header Content */}
                    <div className='relative z-10 container mx-auto px-6 py-12'>
                        <div className='flex flex-col md:flex-row items-center gap-8'>
                            {/* Profile Avatar */}
                            <div className='relative'>
                                <div className='absolute -inset-2 bg-gradient-to-r from-red-600 to-red-800 rounded-full blur-lg opacity-30'></div>
                                <div className='relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-red-500/30 bg-gray-800'>
                                    {currentUser.profilepic ? (
                                        <img 
                                            className='w-full h-full object-cover' 
                                            src={currentUser.profilepic} 
                                            alt="Profile" 
                                        />
                                    ) : (
                                        <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900'>
                                            <div className='text-4xl font-bold text-red-500'>
                                                {username?.charAt(0)?.toUpperCase() || 'U'}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className='flex-1 text-center md:text-left'>
                                <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
                                    @{username}
                                </h1>
                                <p className='text-xl text-gray-300 mb-6 max-w-2xl'>
                                    Support {username}&apos;s creative journey and help forge amazing projects into reality.
                                </p>
                                
                                {/* Stats */}
                                <div className='flex flex-col sm:flex-row gap-6 justify-center md:justify-start'>
                                    <div className='bg-gray-900/50 backdrop-blur-sm rounded-lg px-6 py-4 border border-red-500/20'>
                                        <div className='text-2xl font-bold text-red-400'>
                                            {payments.length}
                                        </div>
                                        <div className='text-sm text-gray-400 uppercase tracking-wide'>
                                            Supporters
                                        </div>
                                    </div>
                                    <div className='bg-gray-900/50 backdrop-blur-sm rounded-lg px-6 py-4 border border-red-500/20'>
                                        <div className='text-2xl font-bold text-red-400'>
                                            ₹{payments.reduce((a, b) => a + b.amount, 0)}
                                        </div>
                                        <div className='text-sm text-gray-400 uppercase tracking-wide'>
                                            Total Raised
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Share URL Section - Only show when user is logged in */}
                                {session && (
                                    <div className='mt-6 max-w-md bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-red-500/20'>
                                        <h3 className='text-sm font-semibold text-white mb-3 flex items-center gap-2'>
                                            <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
                                            </svg>
                                            Share this URL
                                        </h3>
                                        <div className='flex gap-2'>
                                            <input 
                                                type="text" 
                                                value={typeof window !== 'undefined' ? window.location.href : `https://fundforge.com/${username}`}
                                                readOnly
                                                className='flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white text-xs focus:ring-2 focus:ring-red-500 focus:border-red-500'
                                            />
                                            <button 
                                                onClick={() => {
                                                    navigator.clipboard.writeText(window.location.href);
                                                    toast.success('URL copied to clipboard!', {
                                                        position: "top-right",
                                                        autoClose: 2000,
                                                        hideProgressBar: false,
                                                        closeOnClick: true,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        progress: undefined,
                                                        theme: "dark",
                                                        transition: Bounce,
                                                    });
                                                }}
                                                className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-1'
                                            >
                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
                                                </svg>
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Section */}
                <div className='container mx-auto px-6 py-12'>
                    <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                        {/* Supporters Section */}
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-red-500/20 overflow-hidden flex flex-col">
                            <div className="bg-gradient-to-r from-red-900/20 to-transparent p-6 border-b border-red-500/20">
                                <h2 className='text-2xl font-bold text-white flex items-center gap-3'>
                                    <div className='w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center'>
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                    </div>
                                    Recent Supporters
                                </h2>
                            </div>
                            
                            <div className='p-6 flex-1 overflow-y-auto custom-scrollbar'>
                                {payments.length === 0 ? (
                                    <div className='text-center py-8'>
                                        <div className='w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3'>
                                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <p className='text-gray-400'>Be the first supporter!</p>
                                    </div>
                                ) : (
                                    <div className='space-y-4'>
                                        {payments.slice(0, 10).map((p, i) => (
                                            <div key={i} className='group bg-gray-800/30 hover:bg-gray-800/50 p-4 rounded-xl border border-gray-700/30 hover:border-red-500/30 transition-all duration-200'>
                                                <div className='flex gap-4 items-center'>
                                                    <div className='w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white font-bold text-lg'>
                                                        {p.name?.charAt(0)?.toUpperCase() || 'A'}
                                                    </div>
                                                    <div className='flex-1'>
                                                        <div className='flex items-center gap-2 mb-1'>
                                                            <span className='font-semibold text-white'>{p.name}</span>
                                                            <span className='text-gray-400 text-sm'>donated</span>
                                                            <span className='font-bold text-red-400'>₹{p.amount}</span>
                                                        </div>
                                                        {p.message && (
                                                            <p className='text-sm text-gray-300 italic'>&quot;{p.message}&quot;</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Form Section */}
                        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-red-500/20 overflow-hidden flex flex-col">
                            <div className="bg-gradient-to-r from-red-900/20 to-transparent p-6 border-b border-red-500/20">
                                <h2 className='text-2xl font-bold text-white flex items-center gap-3'>
                                    <div className='w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center'>
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                    Support This Creator
                                </h2>
                            </div>
                            
                            <div className='p-6 flex-1 flex flex-col'>
                                <form className='space-y-4 flex-1'>
                                    <div>
                                        <label className='block text-sm font-semibold text-gray-300 mb-2'>Your Name</label>
                                        <input 
                                            onChange={handleChange} 
                                            value={paymentform.name} 
                                            name='name' 
                                            type="text" 
                                            className='w-full p-3 rounded-xl bg-gray-800/50 border border-gray-600/50 text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-400 transition-all duration-200' 
                                            placeholder='Enter your name' 
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className='block text-sm font-semibold text-gray-300 mb-2'>Message (Optional)</label>
                                        <textarea 
                                            onChange={handleChange} 
                                            value={paymentform.message} 
                                            name='message' 
                                            rows={2}
                                            className='w-full p-3 rounded-xl bg-gray-800/50 border border-gray-600/50 text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-400 transition-all duration-200 resize-none' 
                                            placeholder='Leave a message of support...' 
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className='block text-sm font-semibold text-gray-300 mb-2'>Amount (₹)</label>
                                        <input 
                                            onChange={handleChange} 
                                            value={paymentform.amount} 
                                            name="amount" 
                                            type="number" 
                                            min="1"
                                            className='w-full p-3 rounded-xl bg-gray-800/50 border border-gray-600/50 text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-gray-400 transition-all duration-200' 
                                            placeholder='Enter amount' 
                                        />
                                    </div>

                                    <button 
                                        onClick={() => pay(Number.parseInt(paymentform.amount) * 100)} 
                                        type="button" 
                                        className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl shadow-xl hover:shadow-red-500/25 transform hover:scale-[1.02] transition-all duration-200 disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
                                        disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1}
                                    >
                                        Support with ₹{paymentform.amount || '0'}
                                    </button>
                                </form>

                                {/* Quick Payment Options */}
                                <div className='mt-6 pt-4 border-t border-gray-700/30'>
                                    <p className='text-gray-300 font-medium mb-3'>Quick Support Options</p>
                                    <div className='grid grid-cols-3 gap-3'>
                                        <button 
                                            className='bg-gray-800/50 hover:bg-gray-700/50 p-3 rounded-xl border border-gray-600/30 hover:border-red-500/50 transition-all duration-200 text-center group' 
                                            onClick={() => pay(1000)}
                                        >
                                            <div className='font-bold text-white group-hover:text-red-400'>₹10</div>
                                            <div className='text-xs text-gray-400'>Support</div>
                                        </button>
                                        <button 
                                            className='bg-gray-800/50 hover:bg-gray-700/50 p-3 rounded-xl border border-gray-600/30 hover:border-red-500/50 transition-all duration-200 text-center group' 
                                            onClick={() => pay(2000)}
                                        >
                                            <div className='font-bold text-white group-hover:text-red-400'>₹20</div>
                                            <div className='text-xs text-gray-400'>Boost</div>
                                        </button>
                                        <button 
                                            className='bg-gray-800/50 hover:bg-gray-700/50 p-3 rounded-xl border border-gray-600/30 hover:border-red-500/50 transition-all duration-200 text-center group' 
                                            onClick={() => pay(3000)}
                                        >
                                            <div className='font-bold text-white group-hover:text-red-400'>₹30</div>
                                            <div className='text-xs text-gray-400'>Power</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
