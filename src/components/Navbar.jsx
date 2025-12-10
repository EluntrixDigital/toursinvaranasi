import React, { useState } from 'react'
import { Menu, X, Plane } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">Lahsa Tours</span>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Premium Travel</div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            <a href="#home" className="text-gray-700 hover:text-primary-600 font-semibold text-sm transition-colors uppercase tracking-wide">Home</a>
            <a href="#packages" className="text-gray-700 hover:text-primary-600 font-semibold text-sm transition-colors uppercase tracking-wide">Packages</a>
            <a href="#car-rental" className="text-gray-700 hover:text-primary-600 font-semibold text-sm transition-colors uppercase tracking-wide">Car Rental</a>
            <a href="#about" className="text-gray-700 hover:text-primary-600 font-semibold text-sm transition-colors uppercase tracking-wide">About</a>
            <a href="#contact" className="text-gray-700 hover:text-primary-600 font-semibold text-sm transition-colors uppercase tracking-wide">Contact</a>
            <button className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 transition-all font-semibold text-sm uppercase tracking-wide shadow-md hover:shadow-lg">
              Book Now
            </button>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a href="#home" className="block py-2 text-gray-700 hover:text-primary-600">Home</a>
            <a href="#packages" className="block py-2 text-gray-700 hover:text-primary-600">Packages</a>
            <a href="#car-rental" className="block py-2 text-gray-700 hover:text-primary-600">Car Rental</a>
            <a href="#about" className="block py-2 text-gray-700 hover:text-primary-600">About</a>
            <a href="#contact" className="block py-2 text-gray-700 hover:text-primary-600">Contact</a>
            <button className="w-full bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition font-medium mt-2">
              Book Now
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

