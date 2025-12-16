import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Car, Users, Fuel, Settings, Star, ArrowRight, Shield, Gauge, Calendar, MapPin, X } from 'lucide-react'

const CarRental = ({ searchFilters, onClearSearch }) => {
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'carRentals'))
        const carsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setCars(carsData)
        setFilteredCars(carsData)
      } catch (error) {
        console.error('Error fetching cars:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  useEffect(() => {
    if (searchFilters) {
      let filtered = [...cars]

      // Filter by destination (to) - if car has destination field
      if (searchFilters.to) {
        filtered = filtered.filter(car => {
          // If car has destination field, use it; otherwise, skip this filter
          if (car.destination) {
            return car.destination.toLowerCase().includes(searchFilters.to.toLowerCase())
          }
          return true // If no destination field, include the car
        })
      }

      // Filter by date - check availability
      if (searchFilters.date) {
        filtered = filtered.filter(car => 
          car.availability === 'Available' || car.availability === 'Limited'
        )
      }

      setFilteredCars(filtered)
    } else {
      setFilteredCars(cars)
    }
  }, [searchFilters, cars])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(price)
  }

  return (
    <section id="car-rental" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary-50 text-primary-700 px-6 py-2.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide border border-primary-200">
            Premium Fleet
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            Car Rental
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
              ? `Found ${filteredCars.length} car${filteredCars.length !== 1 ? 's' : ''} matching your search`
              : 'Choose from our diverse fleet of popular Indian taxi vehicles and premium luxury cars with comprehensive insurance and 24/7 support'
            }
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-8 rounded"></div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading cars...</p>
          </div>
        ) : filteredCars.length === 0 ? (
          <div className="text-center py-20">
            {searchFilters ? (
              <>
                <p className="text-gray-600 text-lg font-semibold mb-2">No cars found matching your search criteria.</p>
                <p className="text-sm text-gray-500">Try adjusting your search filters or browse all available cars.</p>
              </>
            ) : (
              <>
                <p className="text-gray-600">No cars available at the moment.</p>
        
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100"
            >
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0"></div>
                
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    {car.category}
                  </span>
                </div>
                
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-lg">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-bold text-gray-900">{car.rating}</span>
                  <span className="text-xs text-gray-600">({car.reviews})</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-2.5 rounded-xl shadow-xl">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-2xl font-bold">₹{formatPrice(car.price || 0)}</span>
                        <span className="text-xs opacity-90">/day</span>
                      </div>
                      {car.originalPrice && (
                        <span className="text-xs line-through opacity-75">₹{formatPrice(car.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition">{car.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    car.availability === 'Available' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {car.availability}
                  </span>
                </div>

                {(car.year || car.mileage) && (
                  <div className="flex items-center text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                    {car.year && (
                      <>
                        <Calendar className="h-3 w-3 mr-1 text-primary-600" />
                        <span>{car.year}</span>
                      </>
                    )}
                    {car.year && car.mileage && (
                      <span className="mx-2">•</span>
                    )}
                    {car.mileage && (
                      <>
                        <Gauge className="h-3 w-3 mr-1 text-primary-600" />
                        <span>{car.mileage}</span>
                      </>
                    )}
                  </div>
                )}
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <Users className="h-4 w-4 mr-1 text-primary-600" />
                    <span className="font-medium">{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <Settings className="h-4 w-4 mr-1 text-primary-600" />
                    <span className="font-medium">{car.transmission}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <Fuel className="h-4 w-4 mr-1 text-primary-600" />
                    <span className="font-medium">{car.fuel}</span>
                  </div>
                </div>

                <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-center text-xs text-green-700 font-semibold">
                    <Shield className="h-3 w-3 mr-1" />
                    <span>Insurance Included</span>
                  </div>
                </div>

                {car.features && Array.isArray(car.features) && car.features.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-gray-900 mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {car.features.slice(0, 4).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-md font-medium border border-primary-100"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {car.pickupLocations && Array.isArray(car.pickupLocations) && car.pickupLocations.length > 0 && (
                  <div className="mb-4 p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-xs text-gray-600">
                      <MapPin className="h-3 w-3 mr-1 text-primary-600" />
                      <span className="font-medium">Pickup: </span>
                      <span className="ml-1">
                        {car.pickupLocations.slice(0, 2).join(", ")}
                        {car.pickupLocations.length > 2 && ` +${car.pickupLocations.length - 2} more`}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Starting from</div>
                    <div>
                      <span className="text-2xl font-bold text-primary-600">₹{formatPrice(car.price || 0)}</span>
                      <span className="text-sm text-gray-600">/day</span>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-lg font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center space-x-2 group-hover:shadow-xl transform group-hover:scale-[1.01] uppercase tracking-wide text-sm">
                    <span>Rent Now</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-10 py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center space-x-2 mx-auto uppercase tracking-wide">
            <Car className="h-5 w-5" />
            <span>View All Vehicles</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default CarRental

