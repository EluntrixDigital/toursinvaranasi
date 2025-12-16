import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { MapPin, Calendar, Users, Star, ArrowRight, Clock, Shield, UtensilsCrossed, Wifi, Plane, X } from 'lucide-react'

const HolidayPackages = ({ searchFilters, onClearSearch }) => {
  const [packages, setPackages] = useState([])
  const [filteredPackages, setFilteredPackages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'holidayPackages'))
        const packagesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setPackages(packagesData)
        setFilteredPackages(packagesData)
      } catch (error) {
        console.error('Error fetching packages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  useEffect(() => {
    if (searchFilters) {
      let filtered = [...packages]

      // Filter by destination (to)
      if (searchFilters.to) {
        filtered = filtered.filter(pkg => 
          pkg.location && pkg.location.toLowerCase().includes(searchFilters.to.toLowerCase())
        )
      }

      // Filter by date - check if package is available around the selected date
      if (searchFilters.date) {
        // For now, we'll just check availability status
        // You can enhance this to check specific date ranges if packages have date fields
        filtered = filtered.filter(pkg => 
          pkg.availability === 'Available' || pkg.availability === 'Limited'
        )
      }

      setFilteredPackages(filtered)
    } else {
      setFilteredPackages(packages)
    }
  }, [searchFilters, packages])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <section id="packages" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary-50 text-primary-700 px-6 py-2.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide border border-primary-200">
            Premium Travel Experiences
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            Holiday Packages
          </h2>
          {searchFilters && (
            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-gray-600 font-medium">Search Results:</span>
              {searchFilters.to && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                  Destination: {searchFilters.to}
                </span>
              )}
              {searchFilters.date && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
                  Date: {new Date(searchFilters.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </span>
              )}
              {onClearSearch && (
                <button
                  onClick={onClearSearch}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  <X className="h-3 w-3 mr-1" />
                  Clear Search
                </button>
              )}
            </div>
          )}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            {searchFilters 
              ? `Found ${filteredPackages.length} package${filteredPackages.length !== 1 ? 's' : ''} matching your search`
              : 'Discover the diverse beauty of Incredible India with our handpicked selection of premium travel experiences'
            }
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-8 rounded"></div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading packages...</p>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="text-center py-20">
            {searchFilters ? (
              <>
                <p className="text-gray-600 text-lg font-semibold mb-2">No packages found matching your search criteria.</p>
                <p className="text-sm text-gray-500">Try adjusting your search filters or browse all available packages.</p>
              </>
            ) : (
              <>
                <p className="text-gray-600">No packages available at the moment.</p>
             
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>
                
                {pkg.bestSeller && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg uppercase tracking-wide">
                    Best Seller
                  </div>
                )}
                
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-lg">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-bold text-gray-900">{pkg.rating}</span>
                  <span className="text-xs text-gray-600">({pkg.reviews})</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-3 rounded-xl shadow-xl">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-3xl font-bold">₹{formatPrice(pkg.price || 0)}</span>
                        <span className="text-sm opacity-90">/person</span>
                      </div>
                      {pkg.originalPrice && (
                        <span className="text-sm line-through opacity-75">₹{formatPrice(pkg.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1 text-primary-600" />
                    <span className="text-sm font-semibold">{pkg.location}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    pkg.availability === 'Available' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {pkg.availability}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">{pkg.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{pkg.description}</p>

                {(pkg.duration || pkg.cancellation) && (
                  <div className="flex items-center text-gray-600 mb-4 pb-4 border-b border-gray-200">
                    {pkg.duration && (
                      <>
                        <Calendar className="h-4 w-4 mr-2 text-primary-600" />
                        <span className="text-sm font-medium">{pkg.duration}</span>
                      </>
                    )}
                    {pkg.duration && pkg.cancellation && (
                      <span className="mx-2 text-gray-400">•</span>
                    )}
                    {pkg.cancellation && (
                      <>
                        <Clock className="h-4 w-4 mr-1 text-primary-600" />
                        <span className="text-xs text-gray-500">{pkg.cancellation}</span>
                      </>
                    )}
                  </div>
                )}

                {pkg.features && Array.isArray(pkg.features) && pkg.features.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                      <UtensilsCrossed className="h-4 w-4 mr-1 text-primary-600" />
                      Package Includes:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {pkg.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="text-xs text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2 flex-shrink-0"></span>
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {pkg.highlights && Array.isArray(pkg.highlights) && pkg.highlights.length > 0 && (
                  <div className="mb-4 p-3 bg-primary-50 rounded-lg">
                    <h4 className="text-xs font-bold text-primary-900 mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.highlights.slice(0, 2).map((highlight, index) => (
                        <span key={index} className="text-xs bg-white text-primary-700 px-2 py-1 rounded-md font-medium">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3.5 rounded-lg font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl transform group-hover:scale-[1.01] uppercase tracking-wide text-sm">
                  <span>View Details & Book</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
          </div>
        )}

        <div className="text-center mt-16">
          <button className="bg-white border-2 border-primary-600 text-primary-600 px-10 py-4 rounded-xl font-bold hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] uppercase tracking-wide">
            View All Packages
          </button>
        </div>
      </div>
    </section>
  )
}

export default HolidayPackages

