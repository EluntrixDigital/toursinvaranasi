import React from 'react'
import { MapPin, Calendar, Users, Star, ArrowRight, Clock, Shield, UtensilsCrossed, Wifi, Plane } from 'lucide-react'

const HolidayPackages = () => {
  const packages = [
    {
      id: 1,
      title: "Goa Beach Paradise",
      location: "Goa",
      duration: "5 Days / 4 Nights",
      price: 24999,
      originalPrice: 29999,
      rating: 4.8,
      reviews: 1847,
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      description: "Experience the vibrant beaches, Portuguese heritage, and laid-back lifestyle of India's party capital",
      features: ["Beach Resorts", "All Meals Included", "Water Sports", "Heritage Tours", "Nightlife", "Spa & Wellness"],
      highlights: ["Baga Beach", "Fort Aguada", "Spice Plantation", "Dudhsagar Falls"],
      cancellation: "Free cancellation up to 7 days",
      availability: "Available",
      bestSeller: true
    },
    {
      id: 2,
      title: "Kerala Backwaters",
      location: "Kerala",
      duration: "6 Days / 5 Nights",
      price: 34999,
      originalPrice: 41999,
      rating: 4.9,
      reviews: 2156,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      description: "Cruise through serene backwaters, explore tea plantations, and experience authentic Kerala culture",
      features: ["Houseboat Stay", "Ayurvedic Spa", "Tea Estate Tours", "Traditional Cuisine", "Cultural Shows", "Local Guide"],
      highlights: ["Alleppey Backwaters", "Munnar Tea Gardens", "Periyar Wildlife", "Kathakali Show"],
      cancellation: "Free cancellation up to 5 days",
      availability: "Available",
      bestSeller: true
    },
    {
      id: 3,
      title: "Rajasthan Royal Heritage",
      location: "Rajasthan",
      duration: "7 Days / 6 Nights",
      price: 42999,
      originalPrice: 51999,
      rating: 4.7,
      reviews: 1892,
      image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73a6e?w=800&h=600&fit=crop",
      description: "Discover the royal palaces, majestic forts, and vibrant culture of the Land of Kings",
      features: ["Palace Hotels", "Desert Safari", "Camel Rides", "Folk Music", "Traditional Cuisine", "Heritage Walks"],
      highlights: ["Udaipur City Palace", "Jaisalmer Fort", "Pushkar Camel Fair", "Jaipur Hawa Mahal"],
      cancellation: "Free cancellation up to 10 days",
      availability: "Available",
      bestSeller: true
    },
    {
      id: 4,
      title: "Himalayan Adventure",
      location: "Himachal Pradesh",
      duration: "8 Days / 7 Nights",
      price: 38999,
      originalPrice: 46999,
      rating: 4.9,
      reviews: 1234,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      description: "Trek through snow-capped mountains, visit ancient monasteries, and experience the tranquility of the Himalayas",
      features: ["Mountain Resorts", "Trekking Guides", "Monastery Visits", "Local Cuisine", "Adventure Sports", "Photography Tours"],
      highlights: ["Manali Hill Station", "Rohtang Pass", "Dharamshala", "Spiti Valley"],
      cancellation: "Free cancellation up to 7 days",
      availability: "Limited",
      bestSeller: false
    },
    {
      id: 5,
      title: "Spiritual Varanasi",
      location: "Varanasi, Uttar Pradesh",
      duration: "4 Days / 3 Nights",
      price: 18999,
      originalPrice: 22999,
      rating: 4.6,
      reviews: 3421,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      description: "Experience the spiritual essence of India with Ganga Aarti, temple visits, and ancient rituals",
      features: ["Ganga Aarti", "Temple Tours", "Boat Rides", "Yoga Sessions", "Traditional Food", "Spiritual Guide"],
      highlights: ["Kashi Vishwanath Temple", "Ganga Aarti", "Sarnath", "Boat Ride on Ganges"],
      cancellation: "Free cancellation up to 3 days",
      availability: "Available",
      bestSeller: false
    },
    {
      id: 6,
      title: "Andaman Island Escape",
      location: "Andaman & Nicobar",
      duration: "6 Days / 5 Nights",
      price: 44999,
      originalPrice: 53999,
      rating: 4.8,
      reviews: 1567,
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop",
      description: "Pristine beaches, crystal-clear waters, and exotic marine life in India's tropical paradise",
      features: ["Beach Resorts", "Scuba Diving", "Snorkeling", "Island Hopping", "Seafood", "Water Sports"],
      highlights: ["Havelock Island", "Cellular Jail", "Radhanagar Beach", "Scuba Diving"],
      cancellation: "Free cancellation up to 7 days",
      availability: "Available",
      bestSeller: false
    }
  ]

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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Discover the diverse beauty of Incredible India with our handpicked selection of premium travel experiences
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-8 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
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
                        <span className="text-3xl font-bold">₹{formatPrice(pkg.price)}</span>
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

                <div className="flex items-center text-gray-600 mb-4 pb-4 border-b border-gray-200">
                  <Calendar className="h-4 w-4 mr-2 text-primary-600" />
                  <span className="text-sm font-medium">{pkg.duration}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <Clock className="h-4 w-4 mr-1 text-primary-600" />
                  <span className="text-xs text-gray-500">{pkg.cancellation}</span>
                </div>

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

                <button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3.5 rounded-lg font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-xl transform group-hover:scale-[1.01] uppercase tracking-wide text-sm">
                  <span>View Details & Book</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

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

