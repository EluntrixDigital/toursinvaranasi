import React from 'react'
import { Car, Users, Fuel, Settings, Star, ArrowRight, Shield, Gauge, Calendar, MapPin } from 'lucide-react'

const CarRental = () => {
  const cars = [
    {
      id: 1,
      name: "Toyota Innova Crysta",
      category: "Premium Taxi",
      price: 2499,
      originalPrice: 2999,
      rating: 4.8,
      reviews: 2847,
      year: 2023,
      mileage: "25,000 km",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
      features: ["Manual/Automatic", "7 Seats", "AC", "GPS Navigation", "Spacious", "Reliable"],
      fuel: "Diesel",
      transmission: "Manual/Automatic",
      insurance: "Included",
      seats: 7,
      availability: "Available",
      pickupLocations: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Pune"]
    },
    {
      id: 2,
      name: "Maruti Swift Dzire",
      category: "Economy Taxi",
      price: 1299,
      originalPrice: 1599,
      rating: 4.6,
      reviews: 3421,
      year: 2023,
      mileage: "30,000 km",
      image: "https://images.unsplash.com/photo-1606664515525-b6b8906a5bf8?w=800&h=600&fit=crop",
      features: ["Manual", "5 Seats", "AC", "Fuel Efficient", "Compact", "Easy Parking"],
      fuel: "Petrol/CNG",
      transmission: "Manual",
      insurance: "Included",
      seats: 5,
      availability: "Available",
      pickupLocations: ["Delhi", "Mumbai", "Bangalore", "Pune", "Kolkata", "Ahmedabad"]
    },
    {
      id: 3,
      name: "Honda City",
      category: "Sedan Taxi",
      price: 1899,
      originalPrice: 2299,
      rating: 4.7,
      reviews: 2156,
      year: 2023,
      mileage: "22,000 km",
      image: "https://images.unsplash.com/photo-1621007947382-bb3c399107e3?w=800&h=600&fit=crop",
      features: ["Manual/Automatic", "5 Seats", "AC", "Comfortable", "Spacious Boot", "Premium Interior"],
      fuel: "Petrol",
      transmission: "Manual/Automatic",
      insurance: "Included",
      seats: 5,
      availability: "Available",
      pickupLocations: ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai"]
    },
    {
      id: 4,
      name: "Maruti Ertiga",
      category: "MPV Taxi",
      price: 1799,
      originalPrice: 2199,
      rating: 4.5,
      reviews: 1892,
      year: 2023,
      mileage: "28,000 km",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
      features: ["Manual", "7 Seats", "AC", "Fuel Efficient", "Spacious", "Family Friendly"],
      fuel: "Petrol/CNG",
      transmission: "Manual",
      insurance: "Included",
      seats: 7,
      availability: "Available",
      pickupLocations: ["Delhi", "Mumbai", "Bangalore", "Pune", "Kolkata"]
    },
    {
      id: 5,
      name: "Mahindra XUV500",
      category: "SUV Taxi",
      price: 2999,
      originalPrice: 3499,
      rating: 4.6,
      reviews: 1234,
      year: 2023,
      mileage: "20,000 km",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
      features: ["Manual/Automatic", "7 Seats", "AC", "4WD", "Premium Features", "Spacious"],
      fuel: "Diesel",
      transmission: "Manual/Automatic",
      insurance: "Included",
      seats: 7,
      availability: "Available",
      pickupLocations: ["Delhi", "Mumbai", "Bangalore", "Pune"]
    },
    {
      id: 6,
      name: "Mercedes-Benz E-Class",
      category: "Luxury",
      price: 7387,
      originalPrice: 8500,
      rating: 4.9,
      reviews: 342,
      year: 2023,
      mileage: "12,000 km",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
      features: ["Automatic", "5 Seats", "Premium Sound", "GPS Navigation", "Leather Seats", "Sunroof"],
      fuel: "Petrol",
      transmission: "Automatic",
      insurance: "Included",
      seats: 5,
      availability: "Available",
      pickupLocations: ["Delhi", "Mumbai", "Bangalore"]
    },
    {
      id: 7,
      name: "BMW 5 Series",
      category: "Luxury",
      price: 7885,
      originalPrice: 9000,
      rating: 4.8,
      reviews: 289,
      year: 2023,
      mileage: "15,000 km",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      features: ["Automatic", "5 Seats", "Leather Seats", "Sunroof", "Heated Seats", "360° Camera"],
      fuel: "Petrol",
      transmission: "Automatic",
      insurance: "Included",
      seats: 5,
      availability: "Available",
      pickupLocations: ["Delhi", "Mumbai", "Pune"]
    },
    {
      id: 8,
      name: "Audi A6",
      category: "Premium",
      price: 6557,
      originalPrice: 7500,
      rating: 4.7,
      reviews: 412,
      year: 2022,
      mileage: "18,000 km",
      image: "https://images.unsplash.com/photo-1606664515525-b6b8906a5bf8?w=800&h=600&fit=crop",
      features: ["Automatic", "5 Seats", "Quattro AWD", "Virtual Cockpit", "Matrix LED", "Bang & Olufsen"],
      fuel: "Petrol",
      transmission: "Automatic",
      insurance: "Included",
      seats: 5,
      availability: "Available",
      pickupLocations: ["Delhi", "Mumbai", "Hyderabad"]
    },
    {
      id: 9,
      name: "Tata Indigo/Indica",
      category: "Budget Taxi",
      price: 999,
      originalPrice: 1299,
      rating: 4.3,
      reviews: 4567,
      year: 2022,
      mileage: "40,000 km",
      image: "https://images.unsplash.com/photo-1606664515525-b6b8906a5bf8?w=800&h=600&fit=crop",
      features: ["Manual", "5 Seats", "AC", "Economical", "Reliable", "Easy Maintenance"],
      fuel: "Petrol/CNG",
      transmission: "Manual",
      insurance: "Included",
      seats: 5,
      availability: "Available",
      pickupLocations: ["Delhi", "Mumbai", "Bangalore", "Pune", "Kolkata", "Ahmedabad", "Jaipur"]
    }
  ]

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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Choose from our diverse fleet of popular Indian taxi vehicles and premium luxury cars with comprehensive insurance and 24/7 support
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-8 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
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
                        <span className="text-2xl font-bold">₹{formatPrice(car.price)}</span>
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

                <div className="flex items-center text-xs text-gray-500 mb-4 pb-4 border-b border-gray-200">
                  <Calendar className="h-3 w-3 mr-1 text-primary-600" />
                  <span>{car.year}</span>
                  <span className="mx-2">•</span>
                  <Gauge className="h-3 w-3 mr-1 text-primary-600" />
                  <span>{car.mileage}</span>
                </div>
                
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

                <div className="mb-4 p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center text-xs text-gray-600">
                    <MapPin className="h-3 w-3 mr-1 text-primary-600" />
                    <span className="font-medium">Pickup: </span>
                    <span className="ml-1">{car.pickupLocations.slice(0, 2).join(", ")} +{car.pickupLocations.length - 2} more</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Starting from</div>
                    <div>
                      <span className="text-2xl font-bold text-primary-600">₹{formatPrice(car.price)}</span>
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

