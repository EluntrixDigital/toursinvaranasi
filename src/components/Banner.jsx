import React from 'react'

const Banner = () => {

  return (
    <div className="relative min-h-[500px] md:h-[650px] bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-0 h-full flex items-center">
        <div className="w-full">
          <div className="text-center mb-6 md:mb-12">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-xs font-semibold mb-4 md:mb-8 border border-white/30 tracking-wide uppercase">
              <span className="hidden sm:inline">Atithi Devo Bhava - Serving Since 2010</span>
              <span className="sm:hidden">Since 2010</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 drop-shadow-2xl leading-tight tracking-tight px-2">
              Discover Incredible
              <span className="block text-white mt-1 md:mt-2">
                India With Us
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/95 max-w-3xl mx-auto mb-6 md:mb-10 drop-shadow-lg font-light px-2">
              Explore the rich heritage, diverse culture, and breathtaking landscapes of India with our curated tour packages and premium car rentals
            </p>
            <div className="hidden md:flex items-center justify-center space-x-12 text-white/95">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">50K+</div>
                <div className="text-sm font-medium uppercase tracking-wide">Happy Yatris</div>
              </div>
              <div className="w-px h-16 bg-white/30"></div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">24/7</div>
                <div className="text-sm font-medium uppercase tracking-wide">Support</div>
              </div>
              <div className="w-px h-16 bg-white/30"></div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">4.8</div>
                <div className="text-sm font-medium uppercase tracking-wide">Average Rating</div>
              </div>
            </div>
            {/* Mobile Stats - Compact Version */}
            <div className="md:hidden flex items-center justify-center space-x-4 text-white/95 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-[10px] font-medium uppercase">Yatris</div>
              </div>
              <div className="w-px h-10 bg-white/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-[10px] font-medium uppercase">Support</div>
              </div>
              <div className="w-px h-10 bg-white/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-[10px] font-medium uppercase">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg 
          className="w-full h-20 md:h-28" 
          viewBox="0 0 1440 100" 
          preserveAspectRatio="none"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,80 Q360,40 720,60 T1440,70 L1440,100 L0,100 Z" 
            fill="white"
          />
        </svg>
      </div>
    </div>
  )
}

export default Banner

