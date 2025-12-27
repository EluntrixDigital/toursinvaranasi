import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { MapPin, Star, ArrowRight } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'

const HolidayPackages = ({ limit = null }) => {
  const [packages, setPackages] = useState([])
  const [filteredPackages, setFilteredPackages] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(price)
  }

  const handlePackageClick = (packageId) => {
    navigate(`/package/${packageId}`)
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Discover the diverse beauty of Incredible India with our handpicked selection of premium travel experiences
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
            <p className="text-gray-600">No packages available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(limit ? filteredPackages.slice(0, limit) : filteredPackages).map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => handlePackageClick(pkg.id)}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100 cursor-pointer"
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
                    <span className="text-sm font-semibold">
                      {pkg.city && pkg.state ? `${pkg.city}, ${pkg.state}` : pkg.city || pkg.state || pkg.location || 'Location'}
                    </span>
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
                <p className="text-gray-600 mb-6 text-sm line-clamp-2">
                  {pkg.shortSummary || pkg.description || 'Experience the best of travel with this amazing package.'}
                </p>

                <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3.5 rounded-lg font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl transform group-hover:scale-[1.01] uppercase tracking-wide text-sm">
                  <span>View Details</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
          </div>
          
          {limit && filteredPackages.length > limit && (
            <div className="text-center mt-12">
              <Link
                to="/packages"
                className="inline-block bg-white border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] uppercase tracking-wide"
              >
                View All Packages
              </Link>
            </div>
          )}
          </>
        )}
      </div>
    </section>
  )
}

export default HolidayPackages
