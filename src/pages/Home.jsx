import React, { useEffect } from 'react'
import Banner from '../components/Banner'
import HolidayPackages from '../components/HolidayPackages'
import CarRental from '../components/CarRental'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'
import SEO from '../components/SEO'

const Home = () => {
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

  return (
    <>
      <SEO
        title="Premium Travel & Tours | Holiday Packages & Car Rental"
        description="Discover incredible India with Varanasi Tours. Premium holiday packages, car rental services, and unforgettable travel experiences. Serving since 2010 with 50K+ happy travelers. Book your dream vacation today!"
        keywords="Varanasi Tours, Travel Packages India, Holiday Packages Varanasi, Car Rental Varanasi, Tour Packages, Travel Agency Varanasi, India Tours, Taxi Rental Varanasi, Premium Travel, Travel Services"
        url="/"
      />
      <div id="home">
        <Banner />
        <HolidayPackages limit={3} />
        <CarRental limit={3} />
        <Features />
        <Testimonials />
      </div>
    </>
  )
}

export default Home

