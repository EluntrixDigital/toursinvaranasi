import React, { useState, useEffect } from 'react'
import { collection, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase/config'
import { 
  Layout, 
  Card, 
  Button, 
  Table, 
  Space, 
  Tag,
  Modal,
  Popconfirm,
  message,
  Badge
} from 'antd'
import { 
  EyeOutlined, 
  DeleteOutlined, 
  CheckOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'

const { Content } = Layout

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      const inquiriesData = snapshot.docs.map(doc => ({
        id: doc.id,
        key: doc.id,
        ...doc.data()
      }))
      setInquiries(inquiriesData)
    } catch (error) {
      console.error('Error fetching inquiries:', error)
      message.error('Failed to load inquiries')
    } finally {
      setLoading(false)
    }
  }

  const handleMarkAsRead = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'read' ? 'unread' : 'read'
      await updateDoc(doc(db, 'inquiries', id), {
        status: newStatus,
        readAt: newStatus === 'read' ? new Date().toISOString() : null
      })
      message.success(`Marked as ${newStatus}`)
      fetchInquiries()
    } catch (error) {
      console.error('Error updating inquiry:', error)
      message.error('Failed to update inquiry status')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'inquiries', id))
      message.success('Inquiry deleted successfully')
      fetchInquiries()
      if (selectedInquiry?.id === id) {
        setModalVisible(false)
        setSelectedInquiry(null)
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error)
      message.error('Failed to delete inquiry')
    }
  }

  const handleView = (inquiry) => {
    setSelectedInquiry(inquiry)
    setModalVisible(true)
    // Auto-mark as read when viewing
    if (inquiry.status === 'unread') {
      handleMarkAsRead(inquiry.id, inquiry.status)
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const columns = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status) => (
        <Badge 
          status={status === 'read' ? 'default' : 'processing'} 
          text={
            <Tag color={status === 'read' ? 'green' : 'orange'}>
              {status === 'read' ? 'Read' : 'Unread'}
            </Tag>
          }
        />
      ),
      filters: [
        { text: 'Unread', value: 'unread' },
        { text: 'Read', value: 'read' }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <a href={`mailto:${email}`} className="text-primary-600 hover:underline">
          {email}
        </a>
      )
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => (
        <a href={`tel:${phone}`} className="text-gray-700">
          {phone}
        </a>
      )
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      ellipsis: true,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (date) => formatDate(date),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleView(record)}
          >
            View
          </Button>
          <Button
            type={record.status === 'read' ? 'default' : 'primary'}
            icon={<CheckOutlined />}
            size="small"
            onClick={() => handleMarkAsRead(record.id, record.status)}
            title={record.status === 'read' ? 'Mark as Unread' : 'Mark as Read'}
          >
            {record.status === 'read' ? 'Unread' : 'Read'}
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this inquiry?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  const unreadCount = inquiries.filter(i => i.status === 'unread').length

  return (
    <Content style={{ padding: isMobile ? '16px' : '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Card
        title={
          <div className="flex items-center justify-between">
            <span>Inquiries & Contact Form</span>
            {unreadCount > 0 && (
              <Badge count={unreadCount} showZero>
                <Tag color="orange">New: {unreadCount}</Tag>
              </Badge>
            )}
          </div>
        }
      >
        <Table
          columns={columns}
          dataSource={inquiries}
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* View Inquiry Modal */}
      <Modal
        title={
          <div className="flex items-center">
            <MailOutlined className="mr-2" />
            Inquiry Details
            {selectedInquiry?.status === 'unread' && (
              <Tag color="orange" className="ml-3">Unread</Tag>
            )}
          </div>
        }
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          setSelectedInquiry(null)
        }}
        footer={[
          <Button key="close" onClick={() => {
            setModalVisible(false)
            setSelectedInquiry(null)
          }}>
            Close
          </Button>,
          selectedInquiry && (
            <Popconfirm
              key="delete"
              title="Are you sure you want to delete this inquiry?"
              onConfirm={() => {
                handleDelete(selectedInquiry.id)
                setModalVisible(false)
                setSelectedInquiry(null)
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          )
        ]}
        width={700}
      >
        {selectedInquiry && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <UserOutlined className="mr-2 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-600">Name</span>
                </div>
                <p className="text-gray-900 font-medium">{selectedInquiry.name}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <MailOutlined className="mr-2 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-600">Email</span>
                </div>
                <a href={`mailto:${selectedInquiry.email}`} className="text-primary-600 hover:underline">
                  {selectedInquiry.email}
                </a>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <PhoneOutlined className="mr-2 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-600">Phone</span>
                </div>
                <a href={`tel:${selectedInquiry.phone}`} className="text-gray-900">
                  {selectedInquiry.phone}
                </a>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <ClockCircleOutlined className="mr-2 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-600">Date</span>
                </div>
                <p className="text-gray-900">{formatDate(selectedInquiry.createdAt)}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-sm font-semibold text-gray-600">Subject</span>
              </div>
              <p className="text-gray-900 font-medium">{selectedInquiry.subject}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <span className="text-sm font-semibold text-gray-600">Message</span>
              </div>
              <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                {selectedInquiry.message}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </Content>
  )
}

export default AdminInquiries

