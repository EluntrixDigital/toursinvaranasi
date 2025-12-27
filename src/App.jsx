import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AdminLogin from './pages/AdminLogin'
import AdminLayout from './components/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import AdminPackages from './pages/AdminPackages'
import AdminCars from './pages/AdminCars'
import AdminTestimonials from './pages/AdminTestimonials'
import AdminPayment from './pages/AdminPayment'
import TermsConditions from './pages/TermsConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import CancellationPolicy from './pages/CancellationPolicy'
import Contact from './pages/Contact'
import AdminInquiries from './pages/AdminInquiries'
import PackageDetail from './pages/PackageDetail'
import AllPackages from './pages/AllPackages'
import AllCars from './pages/AllCars'
import ProtectedRoute from './components/ProtectedRoute'
import WhatsAppFloat from './components/WhatsAppFloat'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Home />
              </main>
              <Footer />
              <WhatsAppFloat />
            </div>
          } />

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Policy Pages */}
          <Route path="/terms-conditions" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <TermsConditions />
              </main>
              <Footer />
              <WhatsAppFloat />
            </div>
          } />
          <Route path="/privacy-policy" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <PrivacyPolicy />
              </main>
              <Footer />
              <WhatsAppFloat />
            </div>
          } />
          <Route path="/refund-policy" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <RefundPolicy />
              </main>
              <Footer />
              <WhatsAppFloat />
            </div>
          } />
          <Route path="/cancellation-policy" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <CancellationPolicy />
              </main>
              <Footer />
              <WhatsAppFloat />
            </div>
          } />
          <Route path="/contact" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Contact />
              </main>
              <Footer />
              <WhatsAppFloat />
            </div>
          } />
          
          {/* All Packages Page */}
          <Route path="/packages" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <AllPackages />
              </main>
              <Footer />
              <WhatsAppFloat />
            </div>
          } />
          
          {/* All Cars Page */}
          <Route path="/car-rental" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <AllCars />
              </main>
              <Footer />
              <WhatsAppFloat />
            </div>
          } />
          
          {/* Package Detail Page */}
          <Route path="/package/:id" element={
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <PackageDetail />
              </main>
              <Footer />
              <WhatsAppFloat />
            </div>
          } />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="cars" element={<AdminCars />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="payment" element={<AdminPayment />} />
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
          </Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

