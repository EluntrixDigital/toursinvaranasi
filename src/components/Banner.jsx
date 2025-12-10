import React, { useState } from 'react'
import { Search, Calendar, MapPin } from 'lucide-react'

const Banner = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: '1'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Search submitted:', formData)
    // Handle search logic here
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="relative h-[650px] bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="w-full">
          <div className="text-center mb-12">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-2.5 rounded-full text-xs font-semibold mb-8 border border-white/30 tracking-wide uppercase">
              Atithi Devo Bhava - Serving Since 2010
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl leading-tight tracking-tight">
              Discover Incredible
              <span className="block text-white mt-2">
                India With Us
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto mb-10 drop-shadow-lg font-light">
              Explore the rich heritage, diverse culture, and breathtaking landscapes of India with our curated tour packages and premium car rentals
            </p>
            <div className="flex items-center justify-center space-x-12 text-white/95">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">50K+</div>
                <div className="text-sm font-medium uppercase tracking-wide">Happy Yatris</div>
              </div>
              <div className="w-px h-16 bg-white/30"></div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">28+</div>
                <div className="text-sm font-medium uppercase tracking-wide">Indian States</div>
              </div>
              <div className="w-px h-16 bg-white/30"></div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">4.8</div>
                <div className="text-sm font-medium uppercase tracking-wide">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Search Form */}
          <div className="max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-8 md:p-10 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* From */}
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-700 mb-2.5 uppercase tracking-wide">
                    <MapPin className="inline h-3.5 w-3.5 mr-1.5 text-primary-600" />
                    From
                  </label>
                  <input
                    type="text"
                    name="from"
                    value={formData.from}
                    onChange={handleChange}
                    placeholder="Departure city"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-gray-900 font-medium"
                    required
                  />
                </div>

                {/* To */}
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-700 mb-2.5 uppercase tracking-wide">
                    <MapPin className="inline h-3.5 w-3.5 mr-1.5 text-primary-600" />
                    To
                  </label>
                  <input
                    type="text"
                    name="to"
                    value={formData.to}
                    onChange={handleChange}
                    placeholder="Destination city"
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-gray-900 font-medium"
                    required
                  />
                </div>

                {/* Date */}
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-700 mb-2.5 uppercase tracking-wide">
                    <Calendar className="inline h-3.5 w-3.5 mr-1.5 text-primary-600" />
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-gray-900 font-medium"
                    required
                  />
                </div>

                {/* Passengers */}
                <div className="relative">
                  <label className="block text-xs font-bold text-gray-700 mb-2.5 uppercase tracking-wide">
                    Passengers
                  </label>
                  <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-gray-900 font-medium bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-7 bg-gradient-to-r from-primary-600 to-primary-700 text-white py-4 rounded-lg font-bold text-base hover:from-primary-700 hover:to-primary-800 transition-all duration-300 transform hover:scale-[1.01] flex items-center justify-center space-x-2 shadow-xl uppercase tracking-wide"
              >
                <Search className="h-5 w-5" />
                <span>Search Tours</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </div>
  )
}

export default Banner

