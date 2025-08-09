"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/useractions'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const Dashboard = () => {
    const { data: session, update } = useSession()
    const router = useRouter()
    const [form, setform] = useState({})

    const getData = React.useCallback(async () => {
        if (!session?.user?.name) {
            console.log('No session user name available')
            return
        }
        
        try {
            console.log('Fetching user data for username:', session.user.name)
            let u = await fetchuser(session.user.name)
            console.log('User data fetched:', u)
            setform(u)
        } catch (error) {
            console.error('Error fetching user data:', error)
            // If user not found, redirect to login or show error
            if (error.message === 'User not found') {
                console.log('User not found in database, redirecting to login')
                router.push('/login')
            }
        }
    }, [session?.user?.name, router])

    useEffect(() => {
        console.log('Session data:', session)

        if (!session) {
            console.log('No session, redirecting to login')
            router.push('/login')
        }
        else {
            console.log('Session found, fetching user data for:', session.user.name)
            getData()
        }
    }, [session, router, getData])

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            let result = await updateProfile(formData, session.user.name)
            
            if (result?.error) {
                toast.error(result.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
            } else {
                toast.success('Profile Updated Successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                // Refresh user data
                getData()
            }
        } catch (error) {
            console.error('Profile update error:', error)
            toast.error('Failed to update profile', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
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
                theme="dark"
            />
            <div className='container mx-auto py-5 px-6 min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900'>
                <h1 className='text-center my-5 text-3xl font-bold text-white'>Welcome to your Dashboard</h1>

                <form className="max-w-2xl mx-auto bg-black/80 backdrop-blur-lg rounded-lg p-8 shadow-2xl border border-red-500/30" onSubmit={handleSubmit}>

                    {/* Profile Picture Circle */}
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-red-900/50 rounded-full border-2 border-red-500/40 flex items-center justify-center shadow-xl">
                                {form.profilepic ? (
                                    <img 
                                        src={form.profilepic} 
                                        alt="Profile" 
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                ) : (
                                    <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <button 
                                type="button" 
                                className="absolute bottom-0 right-0 w-6 h-6 bg-red-600 rounded-full border-2 border-white flex items-center justify-center hover:bg-red-700 transition-colors"
                                onClick={() => document.getElementById('profilepic-input').focus()}
                            >
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className='my-2'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">Name</label>
                        <input value={form.name ? form.name : ""} onChange={handleChange} type="text" name='name' id="name" className="block w-full p-2 text-white border border-gray-600 rounded-lg bg-gray-800 text-xs focus:ring-red-500 focus:border-red-500 placeholder-gray-400" />
                    </div>
                    {/* input for email */}
                    <div className="my-2">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
                        <input value={form.email ? form.email : ""} onChange={handleChange} type="email" name='email' id="email" className="block w-full p-2 text-white border border-gray-600 rounded-lg bg-gray-800 text-xs focus:ring-red-500 focus:border-red-500 placeholder-gray-400" />
                    </div>
                    {/* input forusername */}
                    <div className='my-2'>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Username</label>
                        <input value={form.username ? form.username : ""} onChange={handleChange} type="text" name='username' id="username" className="block w-full p-2 text-white border border-gray-600 rounded-lg bg-gray-800 text-xs focus:ring-red-500 focus:border-red-500 placeholder-gray-400" />
                    </div>
                    {/* Profile Picture URL Input (for editing) */}
                    <div className="my-2">
                        <label htmlFor="profilepic-input" className="block mb-2 text-sm font-medium text-white">Profile Picture URL</label>
                        <input 
                            value={form.profilepic ? form.profilepic : ""} 
                            onChange={(e) => {
                                setform({ ...form, profilepic: e.target.value });
                            }} 
                            type="text" 
                            name='profilepic' 
                            id="profilepic-input" 
                            placeholder="Enter image URL for profile picture"
                            className="block w-full p-2 text-white border border-gray-600 rounded-lg bg-gray-800 text-xs focus:ring-red-500 focus:border-red-500 placeholder-gray-400" 
                        />
                    </div>
                    {/* input razorpay id */}
                    <div className="my-2">
                        <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-white">Razorpay Id</label>
                        <input value={form.razorpayid ? form.razorpayid : ""} onChange={handleChange} type="text" name='razorpayid' id="razorpayid" className="block w-full p-2 text-white border border-gray-600 rounded-lg bg-gray-800 text-xs focus:ring-red-500 focus:border-red-500 placeholder-gray-400" />
                    </div>
                    {/* input razorpay secret */}
                    <div className="my-2">
                        <label htmlFor="razorpaysecret" className="block mb-2 text-sm font-medium text-white">Razorpay Secret</label>
                        <input value={form.razorpaysecret ? form.razorpaysecret : ""} onChange={handleChange} type="text" name='razorpaysecret' id="razorpaysecret" className="block w-full p-2 text-white border border-gray-600 rounded-lg bg-gray-800 text-xs focus:ring-red-500 focus:border-red-500 placeholder-gray-400" />
                    </div>

                    {/* Submit Button  */}
                    <div className="my-6">
                        <button type="submit" className="block w-full p-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-red-500 focus:ring-4 focus:outline-none font-medium text-sm">Save</button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default Dashboard
