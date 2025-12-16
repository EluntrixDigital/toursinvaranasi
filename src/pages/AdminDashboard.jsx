import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'
import { Layout, Card, Row, Col, Statistic, Space, Button } from 'antd'
import { 
  AppstoreOutlined, 
  CarOutlined, 
  MessageOutlined,
  InboxOutlined,
  DollarOutlined, 
  UserOutlined,
  PlusOutlined,
  ArrowRightOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Content } = Layout

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    packages: 0,
    cars: 0,
    testimonials: 0,
    inquiries: 0,
    unreadInquiries: 0
  })
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const packagesSnapshot = await getDocs(collection(db, 'holidayPackages'))
        const carsSnapshot = await getDocs(collection(db, 'carRentals'))
        const testimonialsSnapshot = await getDocs(collection(db, 'testimonials'))
        const inquiriesSnapshot = await getDocs(collection(db, 'inquiries'))
        
        const inquiries = inquiriesSnapshot.docs.map(doc => doc.data())
        const unreadInquiries = inquiries.filter(i => i.status === 'unread').length
        
        setStats({
          packages: packagesSnapshot.size,
          cars: carsSnapshot.size,
          testimonials: testimonialsSnapshot.size,
          inquiries: inquiriesSnapshot.size,
          unreadInquiries
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Holiday Packages',
      value: stats.packages,
      icon: <AppstoreOutlined />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      iconBg: 'rgba(102, 126, 234, 0.1)',
      iconColor: '#667eea',
      loading
    },
    {
      title: 'Car Rentals',
      value: stats.cars,
      icon: <CarOutlined />,
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      iconBg: 'rgba(14, 165, 233, 0.1)',
      iconColor: '#0ea5e9',
      loading
    },
    {
      title: 'Testimonials',
      value: stats.testimonials,
      icon: <MessageOutlined />,
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      iconBg: 'rgba(139, 92, 246, 0.1)',
      iconColor: '#8b5cf6',
      loading
    },
    {
      title: 'Inquiries',
      value: stats.inquiries,
      suffix: stats.unreadInquiries > 0 ? ` (${stats.unreadInquiries} new)` : '',
      icon: <InboxOutlined />,
      gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      iconBg: 'rgba(236, 72, 153, 0.1)',
      iconColor: '#ec4899',
      loading
    },
    {
      title: 'Total Revenue',
      value: 0,
      suffix: '₹',
      icon: <DollarOutlined />,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      iconBg: 'rgba(245, 158, 11, 0.1)',
      iconColor: '#f59e0b',
      loading: false
    },
    {
      title: 'Active Users',
      value: 0,
      icon: <UserOutlined />,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      iconBg: 'rgba(16, 185, 129, 0.1)',
      iconColor: '#10b981',
      loading: false
    }
  ]

  const quickActions = [
    {
      title: 'Manage Packages',
      description: 'Add or edit holiday packages',
      icon: <AppstoreOutlined />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      path: '/admin/packages'
    },
    {
      title: 'Manage Cars',
      description: 'Add or edit car rentals',
      icon: <CarOutlined />,
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
      path: '/admin/cars'
    },
    {
      title: 'Manage Testimonials',
      description: 'Add or edit customer testimonials',
      icon: <MessageOutlined />,
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      path: '/admin/testimonials'
    },
    {
      title: 'View Inquiries',
      description: 'View and manage contact form submissions',
      icon: <InboxOutlined />,
      gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      path: '/admin/inquiries'
    },
    {
      title: 'Payment Settings',
      description: 'Configure payment options',
      icon: <DollarOutlined />,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      path: '/admin/payment'
    }
  ]

  return (
    <Content style={{ 
      padding: isMobile ? '20px 16px' : '32px 24px', 
      background: 'linear-gradient(to bottom, #f8fafc 0%, #f1f5f9 100%)', 
      minHeight: '100vh' 
    }}>
      {/* Header Section */}
      <div style={{ 
        marginBottom: isMobile ? 24 : 32,
        background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
        borderRadius: '16px',
        padding: isMobile ? '24px' : '32px',
        color: '#fff',
        boxShadow: '0 10px 30px rgba(14, 165, 233, 0.3)'
      }}>
        <h1 style={{ 
          fontSize: isMobile ? 24 : 32, 
          fontWeight: 700, 
          margin: 0, 
          marginBottom: 8,
          color: '#fff'
        }}>
          Dashboard
        </h1>
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.9)', 
          margin: 0, 
          fontSize: isMobile ? 14 : 16,
          fontWeight: 400
        }}>
          Welcome back! Here's an overview of your business
        </p>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[20, 20]} style={{ marginBottom: 32 }}>
        {statCards.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              style={{
                borderRadius: '16px',
                border: 'none',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
                position: 'relative',
                background: '#fff'
              }}
              bodyStyle={{ padding: '24px' }}
              hoverable
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'inline-flex',
                    padding: '12px',
                    borderRadius: '12px',
                    background: stat.iconBg,
                    marginBottom: '16px'
                  }}>
                    <div style={{ 
                      fontSize: 24, 
                      color: stat.iconColor 
                    }}>
                      {stat.icon}
                    </div>
                  </div>
                  <Statistic
                    title={<span style={{ color: '#64748b', fontSize: 14, fontWeight: 500 }}>{stat.title}</span>}
                    value={stat.value}
                    suffix={stat.suffix ? <span style={{ fontSize: 16, fontWeight: 500, color: '#64748b' }}>{stat.suffix}</span> : undefined}
                    valueStyle={{ 
                      color: '#1e293b',
                      fontSize: 28,
                      fontWeight: 700,
                      marginTop: '4px'
                    }}
                    loading={stat.loading}
                  />
                </div>
                <div style={{
                  width: '4px',
                  height: '60px',
                  background: stat.gradient,
                  borderRadius: '2px',
                  marginLeft: '16px'
                }} />
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Actions Section */}
      <Card 
        title={
          <span style={{ 
            fontSize: 20, 
            fontWeight: 700, 
            color: '#1e293b' 
          }}>
            Quick Actions
          </span>
        }
        extra={
          <Button 
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/admin/packages')}
            style={{
              borderRadius: '10px',
              height: '40px',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              border: 'none',
              boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)'
            }}
          >
            Add Package
          </Button>
        }
        style={{
          borderRadius: '16px',
          border: 'none',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          background: '#fff'
        }}
        bodyStyle={{ padding: '24px' }}
      >
        <Row gutter={[20, 20]}>
          {quickActions.map((action, index) => (
            <Col xs={24} sm={12} lg={8} key={index}>
              <Card
                hoverable
                style={{ 
                  textAlign: 'center',
                  borderRadius: '16px',
                  border: '2px solid transparent',
                  cursor: 'pointer',
                  background: '#fff',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                }}
                onClick={() => navigate(action.path)}
                bodyStyle={{ padding: '32px 24px' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{
                  display: 'inline-flex',
                  padding: '20px',
                  borderRadius: '16px',
                  background: action.gradient,
                  marginBottom: '20px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                }}>
                  <div style={{ 
                    fontSize: 32, 
                    color: '#fff'
                  }}>
                    {action.icon}
                  </div>
                </div>
                <h3 style={{ 
                  margin: '12px 0 8px', 
                  fontSize: 18, 
                  fontWeight: 700,
                  color: '#1e293b'
                }}>
                  {action.title}
                </h3>
                <p style={{ 
                  color: '#64748b', 
                  margin: 0, 
                  fontSize: 14,
                  marginBottom: '16px'
                }}>
                  {action.description}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: '#0ea5e9',
                  fontWeight: 600,
                  fontSize: 14,
                  gap: '6px'
                }}>
                  Get Started <ArrowRightOutlined />
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </Content>
  )
}

export default AdminDashboard
