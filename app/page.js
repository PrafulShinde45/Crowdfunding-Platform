import Image from "next/image";
import Link from "next/link";
import { Suspense, lazy } from "react";

// Lazy load components for better performance
const Navbar = lazy(() => import("@/components/Navbar"));
const Footer = lazy(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <Suspense fallback={<div className="h-16 bg-gray-900 animate-pulse"></div>}>
        <Navbar />
      </Suspense>
      
      {/* Hero Section */}
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-red-800/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1)_0%,transparent_50%)]"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-red-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-red-600 rounded-full animate-ping"></div>
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <div className="mb-8 relative">
            <div className="absolute -inset-3 bg-gradient-to-r from-black via-red-900 to-black rounded-full blur-lg opacity-40 animate-pulse"></div>
            <div className='relative z-10 w-32 h-32 bg-gradient-to-br from-black via-red-400/30 to-black rounded-full flex items-center justify-center shadow-2xl border border-white p-2'>
                              <Image 
                  src="/crowdfunding.gif" 
                  alt="FundForge Logo" 
                  width={96} 
                  height={96} 
                  className="w-24 h-24 object-contain filter brightness-110 contrast-125 drop-shadow-lg"
                  style={{
                    filter: 'brightness(1.1) contrast(1.25) drop-shadow(0 4px 8px rgba(239, 68, 68, 0.3))'
                  }}
                  priority
                  unoptimized
                />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-r from-white via-red-100 to-red-200 bg-clip-text text-transparent leading-tight">
            FundForge
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl leading-relaxed">
            The ultimate crowdfunding platform for creators
          </p>
          
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
            Transform your creative vision into reality. Connect with supporters who believe in your projects and forge your path to success.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <Link href="/signup">
              <button className="text-white bg-gradient-to-br from-gray-900 to-red-800/50 hover:from-red-900 hover:to-red-700 border border-red-500/40 hover:border-red-500 focus:ring-2 focus:outline-none focus:ring-red-500/50 font-bold rounded-lg text-lg px-8 py-4 text-center transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transform hover:scale-105">
                Start Creating
              </button>
            </Link>

            <Link href="/login">
              <button className="text-white bg-gradient-to-br from-gray-900 to-red-800/50 hover:from-red-900 hover:to-red-700 border border-red-500/40 hover:border-red-500 focus:ring-2 focus:outline-none focus:ring-red-500/50 font-bold rounded-lg text-lg px-8 py-4 text-center transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transform hover:scale-105">
                Sign In
              </button>
            </Link>
          </div>
        </div>


      </div>

      {/* Features Section */}
      <div className="relative bg-gradient-to-b from-black via-gray-900 to-black py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
              Why Choose FundForge?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of creators who are already funding their dreams
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-red-500/20 hover:border-red-500/40 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-red-500/10">
              <div className="relative mb-6">
                <div className="absolute -inset-2 bg-red-600/20 rounded-full blur-lg group-hover:bg-red-600/30 transition-all duration-300"></div>
                <Image 
                  className="relative z-10 mx-auto" 
                  width={80} 
                  height={80} 
                  src="/man.gif" 
                  alt="Community support" 
                  loading="lazy" 
                  unoptimized
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Community Support</h3>
              <p className="text-gray-400 text-center leading-relaxed">
                Build a dedicated community of supporters who believe in your vision and want to see you succeed.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-red-500/20 hover:border-red-500/40 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-red-500/10">
              <div className="relative mb-6">
                <div className="absolute -inset-2 bg-red-600/20 rounded-full blur-lg group-hover:bg-red-600/30 transition-all duration-300"></div>
                <Image 
                  className="relative z-10 mx-auto" 
                  width={80} 
                  height={80} 
                  src="/coin.gif" 
                  alt="Easy funding" 
                  loading="lazy" 
                  unoptimized
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Easy Funding</h3>
              <p className="text-gray-400 text-center leading-relaxed">
                Secure and simple payment processing that makes it easy for fans to support your creative projects.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-red-500/20 hover:border-red-500/40 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-red-500/10">
              <div className="relative mb-6">
                <div className="absolute -inset-2 bg-red-600/20 rounded-full blur-lg group-hover:bg-red-600/30 transition-all duration-300"></div>
                <Image 
                  className="relative z-10 mx-auto" 
                  width={80} 
                  height={80} 
                  src="/group.gif" 
                  alt="Creator network" 
                  loading="lazy" 
                  unoptimized
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 text-center">Creator Network</h3>
              <p className="text-gray-400 text-center leading-relaxed">
                Connect with fellow creators, share experiences, and grow together in our supportive ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>



      <Suspense fallback={<div className="h-32 bg-gray-900 animate-pulse"></div>}>
        <Footer />
      </Suspense>
    </>
  );
}
