// Script to insert car rental data into Firebase
// Run with: node scripts/insert-car-data.js

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqoqpF-ImXQJ4n67k8ElyYhNcX5pjNqIw",
  authDomain: "tours-in-varanasi.firebaseapp.com",
  projectId: "tours-in-varanasi",
  storageBucket: "tours-in-varanasi.firebasestorage.app",
  messagingSenderId: "971872803148",
  appId: "1:971872803148:web:0a96a8991d3d476b0c97e9",
  measurementId: "G-25EDPL07K7"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const carsData = [
  {
    name: "SWIFT DZIRE",
    category: "Economy Taxi",
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&auto=format&fit=crop",
    pricePerKm: 11,
    airportTransfer: 900,
    rate8hr80km: 1800,
    rate12hr120km: 2200,
    outstationRatePerKm: 11,
    outstationMinKm: 250,
    year: 2023,
    seats: 5,
    fuel: "Petrol/CNG",
    transmission: "Manual/Automatic",
    rating: 4.5,
    reviews: 128,
    availability: "Available",
    features: ["AC", "Music System", "Power Steering", "Airbags"],
    pickupLocations: ["Varanasi", "Sarnath", "Airport"],
    createdAt: new Date().toISOString()
  },
  {
    name: "HONDA AMAZE",
    category: "Sedan Taxi",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop",
    pricePerKm: 12,
    airportTransfer: 1000,
    rate8hr80km: 1800,
    rate12hr120km: 2400,
    outstationRatePerKm: 12,
    outstationMinKm: 250,
    year: 2023,
    seats: 5,
    fuel: "Petrol",
    transmission: "Manual/Automatic",
    rating: 4.6,
    reviews: 95,
    availability: "Available",
    features: ["AC", "Music System", "Touch Screen", "Rear Camera", "Airbags"],
    pickupLocations: ["Varanasi", "Sarnath", "Airport"],
    createdAt: new Date().toISOString()
  },
  {
    name: "TOYOTA CRYSTA",
    category: "Premium Taxi",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format&fit=crop",
    pricePerKm: 17,
    airportTransfer: 1500,
    rate8hr80km: 2600,
    rate12hr120km: 3400,
    outstationRatePerKm: 17,
    outstationMinKm: 250,
    year: 2024,
    seats: 7,
    fuel: "Diesel",
    transmission: "Manual/Automatic",
    rating: 4.8,
    reviews: 156,
    availability: "Available",
    features: ["AC", "Premium Audio", "Touch Screen", "7 Seats", "Airbags", "ABS"],
    pickupLocations: ["Varanasi", "Sarnath", "Airport"],
    createdAt: new Date().toISOString()
  },
  {
    name: "MARUTI ERTIGA",
    category: "MPV Taxi",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&auto=format&fit=crop",
    pricePerKm: 13,
    airportTransfer: 1250,
    rate8hr80km: 2000,
    rate12hr120km: 2600,
    outstationRatePerKm: 13,
    outstationMinKm: 250,
    year: 2023,
    seats: 7,
    fuel: "Petrol/CNG",
    transmission: "Manual/Automatic",
    rating: 4.7,
    reviews: 203,
    availability: "Available",
    features: ["AC", "7 Seats", "Spacious", "Music System", "Airbags"],
    pickupLocations: ["Varanasi", "Sarnath", "Airport"],
    createdAt: new Date().toISOString()
  },
  {
    name: "FORCE URBANIA",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop",
    pricePerKm: 35,
    airportTransfer: 3500,
    rate8hr80km: 6000,
    rate12hr120km: 7000,
    outstationRatePerKm: 35,
    outstationMinKm: 250,
    year: 2023,
    seats: 13,
    fuel: "Diesel",
    transmission: "Manual",
    rating: 4.9,
    reviews: 87,
    availability: "Available",
    features: ["Premium AC", "Luxury Seating", "Entertainment System", "WiFi", "13 Seats", "Premium Interior"],
    pickupLocations: ["Varanasi", "Sarnath", "Airport"],
    createdAt: new Date().toISOString()
  },
  {
    name: "TOYOTA INNOVA",
    category: "Premium Taxi",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop",
    pricePerKm: 15,
    airportTransfer: 1350,
    rate8hr80km: 2200,
    rate12hr120km: 3000,
    outstationRatePerKm: 15,
    outstationMinKm: 250,
    year: 2024,
    seats: 7,
    fuel: "Diesel",
    transmission: "Manual/Automatic",
    rating: 4.8,
    reviews: 189,
    availability: "Available",
    features: ["AC", "Premium Comfort", "7 Seats", "Music System", "Touch Screen", "Airbags", "ABS"],
    pickupLocations: ["Varanasi", "Sarnath", "Airport"],
    createdAt: new Date().toISOString()
  },
  {
    name: "HONDA CITY",
    category: "Premium Taxi",
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&auto=format&fit=crop",
    pricePerKm: 20,
    airportTransfer: 2000,
    rate8hr80km: 3500,
    rate12hr120km: 4000,
    outstationRatePerKm: 20,
    outstationMinKm: 250,
    year: 2024,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    rating: 4.9,
    reviews: 142,
    availability: "Available",
    features: ["Premium AC", "Touch Screen", "Premium Audio", "Sunroof", "Airbags", "Lane Watch"],
    pickupLocations: ["Varanasi", "Sarnath", "Airport"],
    createdAt: new Date().toISOString()
  },
  {
    name: "TEMPO TRAVELLER",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop",
    pricePerKm: 25,
    airportTransfer: 2500,
    rate8hr80km: 4000,
    rate12hr120km: 5000,
    outstationRatePerKm: 25,
    outstationMinKm: 250,
    year: 2023,
    seats: 12,
    fuel: "Diesel",
    transmission: "Manual",
    rating: 4.7,
    reviews: 98,
    availability: "Available",
    features: ["AC", "12 Seats", "Entertainment System", "Comfortable Seating", "Airbags"],
    pickupLocations: ["Varanasi", "Sarnath", "Airport"],
    createdAt: new Date().toISOString()
  },
  {
    name: "MAHARAJA TEMPO TRAVELLER",
    category: "Luxury",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop",
    pricePerKm: 30,
    airportTransfer: 3500,
    rate8hr80km: 5500,
    rate12hr120km: 6500,
    outstationRatePerKm: 30,
    outstationMinKm: 250,
    year: 2024,
    seats: 12,
    fuel: "Diesel",
    transmission: "Manual",
    rating: 4.9,
    reviews: 124,
    availability: "Available",
    features: ["Luxury AC", "Premium Seating", "Entertainment System", "WiFi", "12 Seats", "Premium Interior", "LED Lights"],
    pickupLocations: ["Varanasi", "Sarnath", "Airport"],
    createdAt: new Date().toISOString()
  }
]

async function insertCarData() {
  try {
    console.log('Starting to insert car data...\n')
    
    for (const car of carsData) {
      try {
        const docRef = await addDoc(collection(db, 'carRentals'), car)
        console.log(`✅ Added: ${car.name} (ID: ${docRef.id})`)
      } catch (error) {
        console.error(`❌ Error adding ${car.name}:`, error.message)
      }
    }
    
    console.log('\n✅ All cars inserted successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error inserting car data:', error)
    process.exit(1)
  }
}

insertCarData()

