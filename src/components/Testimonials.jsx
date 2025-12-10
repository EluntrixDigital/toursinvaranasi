import React from 'react'
import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "Mumbai, Maharashtra",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Amazing experience with Lahsa Tours! The Goa Beach Paradise package was absolutely perfect. Everything was well-organized, from accommodation to activities. Highly recommended!",
      package: "Goa Beach Paradise"
    },
    {
      id: 2,
      name: "Priya Sharma",
      location: "Delhi, NCR",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
      text: "Best travel agency I've ever used! The Kerala Backwaters package exceeded all expectations. The houseboat stay and Ayurvedic spa were incredible. Truly memorable!",
      package: "Kerala Backwaters"
    },
    {
      id: 3,
      name: "Amit Patel",
      location: "Bangalore, Karnataka",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "Rented a Mercedes E-Class for our family trip to Rajasthan. The car was in excellent condition, and the service was top-notch. Will definitely use again!",
      package: "Car Rental"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      location: "Hyderabad, Telangana",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "The Rajasthan Royal Heritage tour was a dream come true! Every detail was perfect, and we got to experience authentic royal culture. Thank you Lahsa Tours!",
      package: "Rajasthan Royal Heritage"
    },
    {
      id: 5,
      name: "Vikram Singh",
      location: "Pune, Maharashtra",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      text: "Outstanding service! The Himalayan Adventure package was incredible. The mountain views and trekking experience were unforgettable. Great value for money!",
      package: "Himalayan Adventure"
    },
    {
      id: 6,
      name: "Ananya Das",
      location: "Kolkata, West Bengal",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      text: "Andaman was magical! The Island Escape package was well-planned, and the beaches were breathtaking. Lahsa Tours made our honeymoon perfect!",
      package: "Andaman Island Escape"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-primary-50 text-primary-700 px-6 py-2.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide border border-primary-200">
            What Our Customers Say
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            Customer Testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Don't just take our word for it - hear from thousands of satisfied travelers
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-8 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>

              <Quote className="h-8 w-8 text-primary-200 mb-4" />

              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              <div className="flex items-center pt-4 border-t border-gray-200">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-primary-200"
                />
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.location}</div>
                  <div className="text-xs text-primary-600 font-medium mt-1">{testimonial.package}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-primary-50 px-6 py-3 rounded-full">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="text-gray-700 font-semibold">
              <span className="text-primary-700">4.8/5</span> Average Rating from <span className="text-primary-700">10,000+</span> Reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials

