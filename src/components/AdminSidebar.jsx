import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Layout, Menu, Avatar, Typography, Space } from 'antd'
import { 
  DashboardOutlined,
  AppstoreOutlined,
  CarOutlined,
  MessageOutlined,
  InboxOutlined,
  CreditCardOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import logo from '../lhasalogo.png'

const { Sider } = Layout
const { Text } = Typography

const AdminSidebar = ({ collapsed, setCollapsed, isMobile = false }) => {
  const location = useLocation()
  const { signOut, userData } = useAuth()
  const navigate = useNavigate()
  
  // Effective collapsed state (always false on mobile)
  const isCollapsed = isMobile ? false : collapsed

  const menuItems = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/admin/dashboard">Dashboard</Link>,
    },
    {
      key: '/admin/packages',
      icon: <AppstoreOutlined />,
      label: <Link to="/admin/packages">Holiday Packages</Link>,
    },
    {
      key: '/admin/cars',
      icon: <CarOutlined />,
      label: <Link to="/admin/cars">Car Rentals</Link>,
    },
    {
      key: '/admin/testimonials',
      icon: <MessageOutlined />,
      label: <Link to="/admin/testimonials">Testimonials</Link>,
    },
    {
      key: '/admin/inquiries',
      icon: <InboxOutlined />,
      label: <Link to="/admin/inquiries">Inquiries</Link>,
    },
    {
      key: '/admin/payment',
      icon: <CreditCardOutlined />,
      label: <Link to="/admin/payment">Payment Settings</Link>,
    },
  ]

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <Sider
      collapsible={!isMobile}
      collapsed={isMobile ? false : collapsed}
      onCollapse={isMobile ? undefined : setCollapsed}
      width={280}
      style={{
        height: isMobile ? '100%' : '100vh',
        position: isMobile ? 'relative' : 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, #0c4a6e 0%, #075985 50%, #0369a1 100%)',
        boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}
      theme="dark"
    >
      {/* Logo Section */}
      <div style={{ 
        padding: isCollapsed ? '20px 16px' : '24px 20px', 
        textAlign: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        flexShrink: 0,
        background: 'rgba(255, 255, 255, 0.05)'
      }}>
        {isCollapsed ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              overflow: 'hidden'
            }}>
              <img 
                src={logo} 
                alt="Logo" 
                style={{ 
                  height: '48px', 
                  width: 'auto',
                  filter: 'brightness(0) invert(1)',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }} 
              />
            </div>
          </div>
        ) : (
          <>
            <div style={{
              display: 'inline-block',
              padding: '6px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '12px',
              marginBottom: '12px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              width: 'fit-content'
            }}>
              <img 
                src={logo} 
                alt="Varanasi Tours Logo" 
                style={{ 
                  height: '80px', 
                  width: 'auto',
                  filter: 'brightness(0) invert(1)',
                  display: 'block'
                }} 
              />
            </div>
            <h2 style={{ 
              color: '#fff', 
              margin: 0, 
              fontSize: 18, 
              fontWeight: 700,
              marginBottom: '4px'
            }}>
              Admin Portal
            </h2>
            <Text style={{ 
              color: 'rgba(255, 255, 255, 0.75)', 
              fontSize: 12,
              fontWeight: 500
            }}>
              Varanasi Tours
            </Text>
          </>
        )}
      </div>

      {/* User Profile Section */}
      {userData && (
        <div style={{ 
          padding: isCollapsed ? '16px 12px' : '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          flexShrink: 0,
          background: 'rgba(255, 255, 255, 0.05)'
        }}>
          <Space 
            direction={isCollapsed ? "vertical" : "horizontal"} 
            size="small" 
            style={{ 
              width: '100%',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              alignItems: 'center'
            }}
          >
            <Avatar 
              size={isCollapsed ? 40 : 48} 
              icon={<UserOutlined />}
              style={{ 
                background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                boxShadow: '0 4px 12px rgba(14, 165, 233, 0.4)',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}
            />
            {!isCollapsed && (
              <div style={{ flex: 1, minWidth: 0 }}>
                <Text style={{ 
                  color: '#fff', 
                  display: 'block', 
                  fontWeight: 600,
                  fontSize: 15,
                  marginBottom: '4px'
                }}>
                  {userData.username || 'Admin'}
                </Text>
                <Text style={{ 
                  color: 'rgba(255, 255, 255, 0.7)', 
                  fontSize: 12, 
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {userData.email}
                </Text>
              </div>
            )}
          </Space>
        </div>
      )}

      {/* Menu Section */}
      <div style={{ 
        flex: 1, 
        overflowY: 'auto',
        overflowX: 'hidden',
        minHeight: 0,
        padding: '12px 0'
      }}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ 
            borderRight: 0,
            background: 'transparent',
            fontSize: 15
          }}
          className="admin-sidebar-menu"
        />
      </div>

      {/* Logout Section */}
      <div style={{ 
        padding: '16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.15)',
        flexShrink: 0,
        background: 'rgba(0, 0, 0, 0.2)'
      }}>
        <Menu
          theme="dark"
          mode="inline"
          items={[
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: isCollapsed ? '' : 'Logout',
              danger: true,
              onClick: handleLogout
            }
          ]}
          style={{ 
            borderRight: 0,
            background: 'transparent'
          }}
        />
      </div>

      <style>{`
        .ant-layout-sider {
          overflow: hidden !important;
        }
        .admin-sidebar-menu {
          overflow-y: auto !important;
          overflow-x: hidden !important;
        }
        .admin-sidebar-menu::-webkit-scrollbar {
          width: 6px;
        }
        .admin-sidebar-menu::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .admin-sidebar-menu::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .admin-sidebar-menu::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        .admin-sidebar-menu .ant-menu-item {
          margin: 4px 12px !important;
          border-radius: 10px !important;
          height: 48px !important;
          line-height: 48px !important;
          transition: all 0.3s ease !important;
        }
        .admin-sidebar-menu .ant-menu-item:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          transform: translateX(4px);
        }
        .admin-sidebar-menu .ant-menu-item-selected {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%) !important;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4) !important;
        }
        .admin-sidebar-menu .ant-menu-item-selected::after {
          display: none !important;
        }
        .admin-sidebar-menu .ant-menu-item-icon {
          font-size: 18px !important;
        }
      `}</style>
    </Sider>
  )
}

export default AdminSidebar
