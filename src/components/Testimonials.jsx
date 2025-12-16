import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'testimonials'))
        const testimonialsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setTestimonials(testimonialsData)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

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

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="mt-4 text-gray-600">Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">No testimonials available at the moment.</p>
         
          </div>
        ) : (
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
        )}

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

