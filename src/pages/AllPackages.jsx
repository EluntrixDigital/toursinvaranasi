import React from 'react'
import HolidayPackages from '../components/HolidayPackages'
import SEO from '../components/SEO'

const AllPackages = () => {
  return (
    <>
      <SEO
        title="Holiday Packages - Premium Travel Experiences"
        description="Explore our curated collection of premium holiday packages across India. From Varanasi to Goa, discover incredible destinations with Varanasi Tours. Best prices, trusted service."
        keywords="holiday packages, tour packages, travel packages India, vacation packages, India tours, Varanasi Tours packages"
        url="/packages"
      />
      <div className="min-h-screen">
        <HolidayPackages />
      </div>
    </>
  )
}

export default AllPackages

