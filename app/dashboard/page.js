
import Dashboard from '@/components/Dashboard'
import { Suspense, lazy } from 'react'

// Lazy load components for better performance
const Navbar = lazy(() => import('@/components/Navbar'))
const Footer = lazy(() => import('@/components/Footer'))

const DashboardPage = () => {
    return (
        <>
            <Suspense fallback={<div className="h-16 bg-gray-900 animate-pulse"></div>}>
                <Navbar />
            </Suspense>
            <Dashboard/>
            <Suspense fallback={<div className="h-32 bg-gray-900 animate-pulse"></div>}>
                <Footer />
            </Suspense>
        </>
    )
}

export default DashboardPage

export const metadata = {
    title: "Dashboard - Get Me A Chai",
  }
   