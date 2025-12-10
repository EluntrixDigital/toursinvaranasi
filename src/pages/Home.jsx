import React from 'react'
import Banner from '../components/Banner'
import HolidayPackages from '../components/HolidayPackages'
import CarRental from '../components/CarRental'
import Features from '../components/Features'
import Testimonials from '../components/Testimonials'

const Home = () => {
  return (
    <div id="home">
      <Banner />
      <HolidayPackages />
      <CarRental />
      <Features />
      <Testimonials />
    </div>
  )
}

export default Home

