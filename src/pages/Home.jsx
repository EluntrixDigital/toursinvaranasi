import React, { useState, useEffect } from 'react'
import Banner from '../components/Banner'
import HolidayPackages from '../components/HolidayPackages'
import CarRental from '../components/CarRental'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'

const Home = () => {
  const [searchFilters, setSearchFilters] = useState(null)

  useEffect(() => {
    // Handle hash navigation when coming from other pages
    const hash = window.location.hash
    if (hash) {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          const offset = 80 // Account for sticky navbar
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }, [])

  const handleSearch = (filters) => {
    setSearchFilters(filters)
  }

  const handleClearSearch = () => {
    setSearchFilters(null)
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div id="home">
      <Banner onSearch={handleSearch} />
      <HolidayPackages searchFilters={searchFilters} onClearSearch={handleClearSearch} />
      <CarRental searchFilters={searchFilters} onClearSearch={handleClearSearch} />
      <Features />
      <Testimonials />
    </div>
  )
}

export default Home

