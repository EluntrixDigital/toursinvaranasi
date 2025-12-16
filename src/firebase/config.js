import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqoqpF-ImXQJ4n67k8ElyYhNcX5pjNqIw",
  authDomain: "tours-in-varanasi.firebaseapp.com",
  projectId: "tours-in-varanasi",
  storageBucket: "tours-in-varanasi.firebasestorage.app",
  messagingSenderId: "971872803148",
  appId: "1:971872803148:web:0a96a8991d3d476b0c97e9",
  measurementId: "G-25EDPL07K7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Initialize Analytics (only in browser environment)
let analytics = null
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app)
  } catch (error) {
    console.warn('Analytics initialization failed:', error)
  }
}
export { analytics }

export default app
