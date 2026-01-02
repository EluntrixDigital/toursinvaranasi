import React from 'react'
import CarRental from '../components/CarRental'
import SEO from '../components/SEO'

const AllCars = () => {
  return (
    <>
      <SEO
        title="Car Rental Varanasi - Premium Taxi & Cab Services"
        description="Rent premium cars in Varanasi with Varanasi Tours. Best taxi and cab rental services with professional drivers. Available 24/7. Book your car rental today!"
        keywords="car rental Varanasi, taxi rental Varanasi, cab rental, car hire Varanasi, Varanasi taxi service, car rental India"
        url="/car-rental"
      />
      <div className="min-h-screen">
        <CarRental />
      </div>
    </>
  )
}

export default AllCars

