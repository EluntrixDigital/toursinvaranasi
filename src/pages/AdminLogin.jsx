import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Card, Form, Input, Button, Alert, Checkbox } from 'antd'
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import logo from '../lhasalogo.png'

const { Content } = Layout

const AdminLogin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loginForm] = Form.useForm()

  // Load saved credentials on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('adminRememberEmail')
    const savedPassword = localStorage.getItem('adminRememberPassword')
    const rememberMe = localStorage.getItem('adminRememberMe') === 'true'

    if (rememberMe && savedEmail && savedPassword) {
      loginForm.setFieldsValue({
        email: savedEmail,
        password: savedPassword,
        rememberMe: true
      })
    }
  }, [loginForm])

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Invalid email or password. Please check your credentials and try again.'
      case 'auth/invalid-email':
        return 'Invalid email address. Please enter a valid email.'
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.'
      case 'auth/too-many-requests':
        return 'Too many failed login attempts. Please try again later.'
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection and try again.'
      default:
        return 'An error occurred during login. Please try again.'
    }
  }

  const handleLogin = async (values) => {
    setError('')
    setLoading(true)
    try {
      const result = await login(values.email, values.password)
      if (result.success) {
        // Handle Remember Me functionality
        if (values.rememberMe) {
          localStorage.setItem('adminRememberEmail', values.email)
          localStorage.setItem('adminRememberPassword', values.password)
          localStorage.setItem('adminRememberMe', 'true')
        } else {
          // Clear saved credentials if Remember Me is unchecked
          localStorage.removeItem('adminRememberEmail')
          localStorage.removeItem('adminRememberPassword')
          localStorage.removeItem('adminRememberMe')
        }
        navigate('/admin/dashboard')
      } else {
        const errorCode = result.errorCode || ''
        setError(getErrorMessage(errorCode))
      }
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 25%, #0369a1 50%, #075985 75%, #0c4a6e 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        animation: 'float 20s ease-in-out infinite',
        opacity: 0.3
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-30%',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)'
      }} />
      
      <Content style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '24px',
        position: 'relative',
        zIndex: 1
      }}>
        <Card
          style={{
            width: '100%',
            maxWidth: 480,
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            border: 'none',
            overflow: 'hidden'
          }}
          bodyStyle={{ padding: '40px' }}
        >
          {/* Logo and Header */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '32px' 
          }}>
            <div style={{
              display: 'inline-block',
              padding: '8px',
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              borderRadius: '16px',
              marginBottom: '20px',
              boxShadow: '0 8px 20px rgba(14, 165, 233, 0.3)',
              width: 'fit-content'
            }}>
              <img 
                src={logo} 
                alt="Varanasi Tours Logo" 
                style={{ 
                  height: '120px', 
                  width: 'auto',
                  filter: 'brightness(0) invert(1)',
                  display: 'block'
                }} 
              />
            </div>
            <h2 style={{ 
              margin: 0, 
              fontSize: 28, 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '8px'
            }}>
              Admin Portal
            </h2>
            <p style={{ 
              margin: 0, 
              color: '#64748b', 
              fontSize: 15,
              fontWeight: 500
            }}>
              Welcome back! Please sign in to continue
            </p>
          </div>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              onClose={() => setError('')}
              style={{ 
                marginBottom: 24,
                borderRadius: '12px',
                border: 'none'
              }}
            />
          )}

          <Form
            form={loginForm}
            layout="vertical"
            onFinish={handleLogin}
            size="large"
          >
            <Form.Item
              name="email"
              label={<span style={{ fontWeight: 600, color: '#1e293b' }}>Email Address</span>}
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input
                prefix={<MailOutlined style={{ color: '#0ea5e9' }} />}
                placeholder="Enter your email"
                style={{
                  borderRadius: '12px',
                  padding: '10px 16px',
                  fontSize: '15px',
                  border: '2px solid #e2e8f0',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0ea5e9'
                  e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span style={{ fontWeight: 600, color: '#1e293b' }}>Password</span>}
              rules={[
                { required: true, message: 'Please enter your password' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#0ea5e9' }} />}
                placeholder="Enter your password"
                style={{
                  borderRadius: '12px',
                  padding: '10px 16px',
                  fontSize: '15px',
                  border: '2px solid #e2e8f0',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#0ea5e9'
                  e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0'
                  e.target.style.boxShadow = 'none'
                }}
              />
            </Form.Item>

            <Form.Item name="rememberMe" valuePropName="checked" style={{ marginBottom: 24, marginTop: '8px' }}>
              <Checkbox style={{ color: '#64748b', fontSize: '14px' }}>
                Remember me
              </Checkbox>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, marginTop: '32px' }}>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                icon={<LoginOutlined />}
                style={{
                  height: '50px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(14, 165, 233, 0.4)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 6px 20px rgba(14, 165, 233, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 4px 15px rgba(14, 165, 233, 0.4)'
                }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, -20px) rotate(180deg); }
        }
      `}</style>
    </Layout>
  )
}

export default AdminLogin
