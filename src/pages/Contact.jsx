import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react'
import { message } from 'antd'
import SEO from '../components/SEO'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        status: 'unread',
        createdAt: new Date().toISOString(),
        readAt: null
      })
      
      message.success('Thank you! Your message has been sent successfully.')
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      message.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const contactStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Varanasi Tours",
    "description": "Get in touch with Varanasi Tours for booking inquiries, travel assistance, and customer support",
    "url": "https://toursinvaranasi.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Varanasi Tours",
      "telephone": "+918840142147",
      "email": "info@varanasitours.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ashok Marg, Road, near Tibbati Temple, Sarnath",
        "addressLocality": "Varanasi",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "221007",
        "addressCountry": "IN"
      }
    }
  }

  return (
    <>
      <SEO
        title="Contact Us - Get in Touch with Varanasi Tours"
        description="Contact Varanasi Tours for booking inquiries, travel assistance, and customer support. Call +91 88401 42147 or email info@varanasitours.com. We're here to help plan your perfect trip!"
        keywords="contact Varanasi Tours, travel inquiry, book tour, customer support, Varanasi travel agency contact"
        url="/contact"
        structuredData={contactStructuredData}
      />
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-primary-50 text-primary-700 px-6 py-2.5 rounded-full text-xs font-semibold mb-6 uppercase tracking-wide border border-primary-200">
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 tracking-tight">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Have questions or need assistance? We're here to help! Reach out to us and we'll respond as soon as possible.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto mt-8 rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Ashok Marg, Road, near Tibbati Temple,<br />
                      Sarnath, Varanasi,<br />
                      Uttar Pradesh 221007
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <a href="tel:8840142147" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                      +91 88401 42147
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href="mailto:info@varanasitours.com" className="text-gray-600 hover:text-primary-600 transition-colors text-sm">
                      info@varanasitours.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">We're Always Available</h3>
              <div className="space-y-2">
                <p className="text-sm opacity-90 leading-relaxed">
                  Our team is available 24/7 to assist you with all your travel needs. Feel free to reach out anytime!
                </p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-lg font-bold">24/7 Support</p>
                  <p className="text-sm opacity-90 mt-1">Round the clock assistance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-green-800 font-medium">Message sent successfully! We'll get back to you soon.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-gray-900"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-gray-900"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-gray-900"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-gray-900"
                      placeholder="What is this regarding?"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-gray-900 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-all font-semibold text-base uppercase tracking-wide shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Contact

