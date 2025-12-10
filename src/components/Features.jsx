import React from 'react'
import { Shield, Headphones, Award, Clock, CreditCard, Plane, Car, MapPin } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Booking",
      description: "100% secure payment gateway with SSL encryption. Your data and payments are completely safe."
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support in multiple languages. We're here to help you anytime, anywhere."
    },
    {
      icon: Award,
      title: "Best Price Guarantee",
      description: "We guarantee the best prices for all our packages. Find a lower price? We'll match it!"
    },
    {
      icon: Clock,
      title: "Instant Confirmation",
      description: "Get instant booking confirmation via email and SMS. No waiting, no hassle."
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      description: "Multiple payment options including EMI, credit cards, UPI, and net banking. Pay as you prefer."
    },
    {
      icon: Plane,
      title: "Expert Travel Guides",
      description: "Experienced and certified travel guides who know the destinations inside out."
    },
    {
      icon: Car,
      title: "Well-Maintained Fleet",
      description: "All our rental cars are regularly serviced, fully insured, and equipped with modern amenities."
    },
    {
      icon: MapPin,
      title: "Multiple Pickup Points",
      description: "Convenient pickup and drop-off locations across major cities in India."
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary-50 text-primary-700 px-6 py-2.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide border border-primary-200">
            Why Choose Us
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            Premium Features & Benefits
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Experience world-class service with our comprehensive travel solutions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-8 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
              >
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of satisfied travelers and experience the world with Lahsa Tours
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] uppercase tracking-wide">
                Book Your Package
              </button>
              <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 uppercase tracking-wide">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features

