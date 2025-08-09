
import Dashboard from '@/components/Dashboard'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const DashboardPage = () => {
    return (
        <>
            <Navbar />
            <Dashboard/>
            <Footer />
        </>
    )
}

export default DashboardPage

export const metadata = {
    title: "Dashboard - Get Me A Chai",
  }
   