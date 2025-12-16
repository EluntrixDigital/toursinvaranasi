import React from 'react'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <span className="text-2xl font-bold">Varanasi Tours</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for premium travel experiences. Discover the world with us.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#home" className="text-gray-400 hover:text-white transition">Home</a>
              </li>
              <li>
                <a href="/#packages" className="text-gray-400 hover:text-white transition">Holiday Packages</a>
              </li>
              <li>
                <a href="/#car-rental" className="text-gray-400 hover:text-white transition">Car Rental</a>
              </li>
              <li>
                <a href="/#about" className="text-gray-400 hover:text-white transition">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition">Contact</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Tour Packages</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">Car Rental</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400">Ashok Marg, Road, near Tibbati Temple, Sarnath, Varanasi, Uttar Pradesh 221007</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0" />
                <span className="text-gray-400">88401 42147</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-primary-400 flex-shrink-0" />
                <span className="text-gray-400">info@varanasitours.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center mb-6">
            <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
              <a href="/terms-conditions" className="text-gray-400 hover:text-white transition">Terms & Conditions</a>
              <span className="text-gray-600">•</span>
              <a href="/privacy-policy" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
              <span className="text-gray-600">•</span>
              <a href="/refund-policy" className="text-gray-400 hover:text-white transition">Refund Policy</a>
              <span className="text-gray-600">•</span>
              <a href="/cancellation-policy" className="text-gray-400 hover:text-white transition">Cancellation Policy</a>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-400 mb-2">
              © {new Date().getFullYear()} Varanasi Tours. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Designed and Developed by{' '}
              <a 
                href="http://eluntrixdigital.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                Eluntrix Digital
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

