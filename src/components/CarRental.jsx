import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Car, Phone, ArrowRight, MapPin, Grid3x3, List } from 'lucide-react'
import { Link } from 'react-router-dom'

const CarRental = ({ limit = null }) => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'carRentals'))
        const carsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setCars(carsData)
      } catch (error) {
        console.error('Error fetching cars:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  // Switch to grid view on mobile devices
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && viewMode === 'list') {
        setViewMode('grid')
      }
    }
    
    handleResize() // Check on mount
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [viewMode])

  const formatPrice = (price) => {
    if (!price) return 'N/A'
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <section id="car-rental" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${viewMode === 'list' ? 'max-w-[90rem]' : 'max-w-6xl'}`}>
        <div className="text-center mb-16">
          <div className="inline-block bg-primary-50 text-primary-700 px-6 py-2.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide border border-primary-200">
            Premium Fleet
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            Varanasi Taxi Rental
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed mb-4">
            Varanasi CAB provides best cars with neat and clean drivers.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-8 rounded"></div>
          
          {/* View Toggle Buttons - Hidden on mobile and when limit is set */}
          {!limit && (
            <div className="hidden md:flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  viewMode === 'grid'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Grid3x3 className="h-5 w-5" />
                Grid View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  viewMode === 'list'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <List className="h-5 w-5" />
                List View
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading cars...</p>
          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">No cars available at the moment.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(limit ? cars.slice(0, limit) : cars).map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col"
                >
                {/* Car Image */}
                <div className="relative w-full h-48 flex-shrink-0">
                  {car.image ? (
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                      <Car className="h-16 w-16 text-white opacity-50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 drop-shadow-lg">
                      {car.name || 'Car Name'}
                    </h3>
                    {car.pricePerKm && (
                      <p className="text-white/90 text-lg font-semibold drop-shadow">
                        Rs. {car.pricePerKm}/KM
                      </p>
                    )}
                  </div>
                </div>

                {/* Car Details */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Inside City Pricing */}
                  <div className="mb-4">
                    <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                      Inside City
                    </h4>
                    
                    <div className="space-y-2">
                      {car.airportTransfer && (
                        <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                          <span className="text-gray-700 text-sm font-medium">Airport Transfer</span>
                          <span className="text-primary-600 font-bold text-sm">Rs. {formatPrice(car.airportTransfer)}</span>
                        </div>
                      )}
                      
                      {car.rate8hr80km && (
                        <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                          <span className="text-gray-700 text-sm font-medium">8 hr / 80 KM</span>
                          <span className="text-primary-600 font-bold text-sm">Rs. {formatPrice(car.rate8hr80km)}</span>
                        </div>
                      )}
                      
                      {car.rate12hr120km && (
                        <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                          <span className="text-gray-700 text-sm font-medium">12 hr / 120 KM</span>
                          <span className="text-primary-600 font-bold text-sm">Rs. {formatPrice(car.rate12hr120km)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Outstation Pricing */}
                  {(car.outstationRatePerKm || car.outstationMinKm) && (
                    <div className="mb-4">
                      <h4 className="text-base font-bold text-gray-900 mb-3">Outstation</h4>
                      
                      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                        {car.outstationRatePerKm && (
                          <div className="flex items-center justify-between py-1 mb-2">
                            <span className="text-gray-700 text-sm font-medium">Rate</span>
                            <span className="text-primary-600 font-bold text-sm">Rs. {car.outstationRatePerKm}/KM</span>
                          </div>
                        )}
                        {car.outstationMinKm && (
                          <div className="pt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-600">Outstation: Min. {car.outstationMinKm}KM / Day</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Additional Info */}
                  {(car.category || car.seats || car.fuel) && (
                    <div className="mt-auto mb-4 flex flex-wrap gap-2">
                      {car.category && (
                        <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                          {car.category}
                        </span>
                      )}
                      {car.seats && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {car.seats} Seats
                        </span>
                      )}
                      {car.fuel && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {car.fuel}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Book Now Button */}
                  <a
                    href="tel:8840142147"
                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-lg font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] uppercase tracking-wide text-xs mt-auto"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Book Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
                ))}
            </div>
            
            {limit && cars.length > limit && (
              <div className="text-center mt-12">
                <Link
                  to="/car-rental"
                  className="inline-block bg-white border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] uppercase tracking-wide"
                >
                  View All Cars
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="hidden md:block bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Car Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Rate/KM</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Airport Transfer</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">8Hr / 80KM</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">12Hr / 120KM</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Outstation</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Details</th>
                    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {cars.map((car, index) => (
                    <tr key={car.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-base font-bold text-gray-900">{car.name || 'Car Name'}</div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {car.category && (
                              <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-semibold">
                                {car.category}
                              </span>
                            )}
                            {car.seats && (
                              <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">
                                {car.seats} Seats
                              </span>
                            )}
                            {car.fuel && (
                              <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">
                                {car.fuel}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-primary-600 font-bold text-base">Rs. {car.pricePerKm || 'N/A'}/KM</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900 font-semibold">Rs. {formatPrice(car.airportTransfer)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900 font-semibold">Rs. {formatPrice(car.rate8hr80km)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-900 font-semibold">Rs. {formatPrice(car.rate12hr120km)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <span className="text-gray-900 font-semibold">Rs. {car.outstationRatePerKm || 'N/A'}/KM</span>
                          {car.outstationMinKm && (
                            <div className="text-xs text-gray-600 mt-1">Min. {car.outstationMinKm}KM/Day</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1 text-primary-600" />
                          <span>Inside City</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <a
                          href="tel:8840142147"
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-md hover:shadow-lg text-sm"
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Book Now
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-primary-50 px-6 py-3 rounded-full">
            <Car className="h-5 w-5 text-primary-600" />
            <span className="text-gray-700 font-semibold">
              Need help choosing? <a href="tel:8840142147" className="text-primary-600 hover:underline">Call us at +91 88401 42147</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CarRental
