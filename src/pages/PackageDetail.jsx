import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { MapPin, Calendar, Users, Star, ArrowRight, Clock, Shield, UtensilsCrossed, Wifi, Plane, Check, X, ArrowLeft } from 'lucide-react'
import SEO from '../components/SEO'

const PackageDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pkg, setPkg] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const docRef = doc(db, 'holidayPackages', id)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          setPkg({ id: docSnap.id, ...docSnap.data() })
        } else {
          navigate('/')
        }
      } catch (error) {
        console.error('Error fetching package:', error)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPackage()
    }
  }, [id, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading package details...</p>
        </div>
      </div>
    )
  }

  if (!pkg) {
    return null
  }

  // Generate structured data for the package
  const packageStructuredData = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": pkg.title,
    "description": pkg.description?.replace(/<[^>]*>/g, '').substring(0, 300) || `Book ${pkg.title} package with Varanasi Tours`,
    "image": pkg.image,
    "url": `https://toursinvaranasi.com/package/${pkg.id}`,
    "provider": {
      "@type": "TravelAgency",
      "name": "Varanasi Tours",
      "url": "https://toursinvaranasi.com",
      "telephone": "+918840142147",
      "email": "info@varanasitours.com"
    },
    "tourBookingPage": `https://toursinvaranasi.com/package/${pkg.id}`,
    "itinerary": {
      "@type": "ItemList",
      "numberOfItems": Array.isArray(pkg.itinerary) ? pkg.itinerary.length : 1,
      "itemListElement": Array.isArray(pkg.itinerary) ? pkg.itinerary.map((day, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": `Day ${index + 1}`,
        "description": day
      })) : [{
        "@type": "ListItem",
        "position": 1,
        "description": pkg.itinerary
      }]
    },
    ...(pkg.city && {
      "destinationLocation": {
        "@type": "City",
        "name": pkg.city,
        ...(pkg.state && { "containedIn": { "@type": "State", "name": pkg.state } })
      }
    }),
    ...(pkg.duration && { "duration": pkg.duration })
  }

  const packageKeywords = [
    pkg.title,
    pkg.city,
    pkg.state,
    'tour package',
    'holiday package',
    'travel package',
    'Varanasi Tours'
  ].filter(Boolean).join(', ')

  return (
    <>
      <SEO
        title={pkg.title}
        description={pkg.description?.replace(/<[^>]*>/g, '').substring(0, 160) || `Book ${pkg.title} - Premium travel package with Varanasi Tours. ${pkg.duration ? `Duration: ${pkg.duration}.` : ''} Contact us for pricing details.`}
        keywords={packageKeywords}
        image={pkg.image}
        url={`/package/${pkg.id}`}
        type="website"
        canonical={`https://toursinvaranasi.com/package/${pkg.id}`}
        structuredData={packageStructuredData}
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Image */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        <img
          src={pkg.image}
          alt={`${pkg.title} - ${pkg.city || ''} ${pkg.state || ''} tour package. Book now with Varanasi Tours`}
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg font-medium text-gray-900 hover:bg-white transition-all duration-300 flex items-center space-x-2 shadow-lg"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back</span>
        </button>

        {/* Package Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
          <div className="max-w-7xl mx-auto">
            {pkg.bestSeller && (
              <div className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg uppercase tracking-wide mb-3">
                Best Seller
              </div>
            )}
            <h1 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">{pkg.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1.5" />
                <span>{pkg.state || pkg.location}</span>
              </div>
              {pkg.duration && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1.5" />
                  <span>{pkg.duration}</span>
                </div>
              )}
              {pkg.rating && (
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1.5 fill-yellow-400 text-yellow-400" />
                  <span>{pkg.rating} ({pkg.reviews} reviews)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Book Now Box */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Interested in this package?</h3>
                  <p className="text-white/90 text-sm mb-3">Contact us for pricing and availability</p>
                  <div className="mt-2">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      pkg.availability === 'Available' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-orange-500 text-white'
                    }`}>
                      {pkg.availability}
                    </span>
                  </div>
                </div>
                <a
                  href={`https://wa.me/918840142147?text=${encodeURIComponent(`Hello! I'm interested in booking the ${pkg.title} package. Please provide more details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-primary-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-[1.02] text-sm"
                >
                  <span>Book Now</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Package Description</h2>
              <div className="text-gray-600 leading-relaxed text-sm md:text-base" dangerouslySetInnerHTML={{ __html: pkg.description }}></div>
            </div>

            {/* Highlights */}
            {pkg.highlights && Array.isArray(pkg.highlights) && pkg.highlights.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-primary-600" />
                  Package Highlights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-2.5">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm md:text-base">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Itinerary */}
            {pkg.itinerary && (
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary-600" />
                  Detailed Itinerary
                </h2>
                <div className="space-y-4">
                  {Array.isArray(pkg.itinerary) ? (
                    pkg.itinerary.map((day, index) => (
                      <div key={index} className="border-l-4 border-primary-600 pl-4 pb-4">
                        <div className="font-semibold text-base text-gray-900 mb-1.5">Day {index + 1}</div>
                        <div className="text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line">{day}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-600 leading-relaxed text-sm md:text-base whitespace-pre-line">{pkg.itinerary}</div>
                  )}
                </div>
              </div>
            )}

            {/* Features */}
            {pkg.features && Array.isArray(pkg.features) && pkg.features.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <UtensilsCrossed className="h-5 w-5 mr-2 text-primary-600" />
                  What's Included
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2.5">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exclusions */}
            {pkg.exclusions && Array.isArray(pkg.exclusions) && pkg.exclusions.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <X className="h-5 w-5 mr-2 text-red-500" />
                  What's Not Included
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.exclusions.map((exclusion, index) => (
                    <div key={index} className="flex items-start space-x-2.5">
                      <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm md:text-base">{exclusion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-5">Package Details</h3>
              
              <div className="space-y-3.5 mb-6">
                {pkg.duration && (
                  <div className="flex items-start text-gray-700">
                    <Calendar className="h-4 w-4 mr-2.5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs text-gray-500 block mb-0.5">Duration</span>
                      <span className="text-sm font-medium">{pkg.duration}</span>
                    </div>
                  </div>
                )}
                
                {(pkg.city || pkg.state || pkg.location) && (
                  <div className="flex items-start text-gray-700">
                    <MapPin className="h-4 w-4 mr-2.5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs text-gray-500 block mb-0.5">Location</span>
                      <span className="text-sm font-medium">{pkg.state || pkg.location}</span>
                    </div>
                  </div>
                )}

                {pkg.rating && (
                  <div className="flex items-start text-gray-700">
                    <Star className="h-4 w-4 mr-2.5 text-primary-600 fill-yellow-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs text-gray-500 block mb-0.5">Rating</span>
                      <span className="text-sm font-medium">{pkg.rating} ({pkg.reviews} reviews)</span>
                    </div>
                  </div>
                )}

                {pkg.cancellation && (
                  <div className="flex items-start text-gray-700">
                    <Clock className="h-4 w-4 mr-2.5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-xs text-gray-500 block mb-0.5">Cancellation</span>
                      <p className="text-xs text-gray-600 mt-0.5">{pkg.cancellation}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-5 border-t border-gray-200">
                <div className="text-center mb-4">
                  <p className="text-gray-600 text-sm mb-2">Contact us for pricing details</p>
                </div>
                <a
                  href={`https://wa.me/918840142147?text=${encodeURIComponent(`Hello! I'm interested in booking the ${pkg.title} package. Please provide more details.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-[1.02] text-sm mb-3"
                >
                  <span>Book Now</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="tel:+918840142147"
                  className="w-full border-2 border-primary-600 text-primary-600 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
                >
                  <span>Call for Enquiry</span>
                </a>
              </div>
            </div>

            {/* Hotel/Accommodation Info */}
            {(pkg.hotelDetails || pkg.accommodation) && (
              <div className="bg-white rounded-xl p-5 shadow-md border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary-600" />
                  Accommodation
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {pkg.hotelDetails || pkg.accommodation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default PackageDetail
