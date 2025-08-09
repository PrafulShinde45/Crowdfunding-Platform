import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-600">
              <img className="h-8 w-8" src="/tea.gif" alt="Logo" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              404 - Page Not Found
            </h2>
            <p className="mt-2 text-center text-sm text-gray-300">
              The page you&apos;re looking for doesn&apos;t exist.
            </p>
          </div>

          <div className="bg-black/80 backdrop-blur-lg rounded-lg p-8 shadow-2xl border border-red-500/30">
            <p className="text-gray-300 mb-6">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or you entered the wrong URL.
            </p>
            
            <div className="space-y-4">
              <Link href="/">
                <button className="w-full text-white bg-gradient-to-br from-red-600 to-red-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Go Home
                </button>
              </Link>
              
              <Link href="/about">
                <button className="w-full text-white bg-gradient-to-br from-gray-600 to-gray-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
