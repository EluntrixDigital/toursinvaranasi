import React, { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { 
  Layout, 
  Card, 
  Button, 
  Table, 
  Space, 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  Select,
  Row,
  Col,
  Image,
  Popconfirm,
  message
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons'

const { Content } = Layout
const { TextArea } = Input

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form] = Form.useForm()
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
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'testimonials'))
      const testimonialsData = snapshot.docs.map(doc => ({
        id: doc.id,
        key: doc.id,
        ...doc.data()
      }))
      setTestimonials(testimonialsData)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      const errorMessage = error.message || 'Failed to load testimonials'
      message.error(`Failed to load testimonials: ${errorMessage}`)
      
      if (error.code === 'permission-denied') {
        message.error('Permission denied. Please check Firestore security rules for the testimonials collection.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (values) => {
    try {
      const testimonialData = {
        ...values,
        rating: parseInt(values.rating),
        createdAt: new Date().toISOString()
      }

      if (editingId) {
        await updateDoc(doc(db, 'testimonials', editingId), testimonialData)
        message.success('Testimonial updated successfully')
      } else {
        await addDoc(collection(db, 'testimonials'), testimonialData)
        message.success('Testimonial added successfully')
      }

      form.resetFields()
      setModalVisible(false)
      setEditingId(null)
      fetchTestimonials()
    } catch (error) {
      console.error('Error saving testimonial:', error)
      const errorMessage = error.message || 'Failed to save testimonial'
      message.error(`Failed to save testimonial: ${errorMessage}`)
      
      // Show more specific error messages
      if (error.code === 'permission-denied') {
        message.error('Permission denied. Please check Firestore security rules for the testimonials collection.')
      } else if (error.code === 'unavailable') {
        message.error('Firestore is unavailable. Please check your internet connection.')
      }
    }
  }

  const handleEdit = (testimonial) => {
    setEditingId(testimonial.id)
    form.setFieldsValue({
      ...testimonial
    })
    setModalVisible(true)
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'testimonials', id))
      message.success('Testimonial deleted successfully')
      fetchTestimonials()
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      message.error('Failed to delete testimonial')
    }
  }

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      render: (url) => (
        <Image
          src={url}
          alt="Testimonial"
          width={60}
          height={60}
          style={{ objectFit: 'cover', borderRadius: '50%' }}
          fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Ccircle fill='%23ddd' cx='30' cy='30' r='30'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E"
        />
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <Space>
          <StarOutlined style={{ color: '#fadb14' }} />
          <span>{rating}/5</span>
        </Space>
      ),
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: 'Package',
      dataIndex: 'package',
      key: 'package',
    },
    {
      title: 'Text',
      dataIndex: 'text',
      key: 'text',
      ellipsis: true,
      render: (text) => text?.substring(0, 50) + (text?.length > 50 ? '...' : '')
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this testimonial?"
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

  return (
    <Content style={{ padding: isMobile ? '16px' : '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Card
        title="Testimonials"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              form.resetFields()
              setEditingId(null)
              setModalVisible(true)
            }}
          >
            Add Testimonial
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={testimonials}
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1200 }}
        />
      </Card>

      <Modal
        title={editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
          setEditingId(null)
        }}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            rating: 5
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please enter name' }]}
              >
                <Input placeholder="Enter customer name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="location"
                label="Location"
                rules={[{ required: true, message: 'Please enter location' }]}
              >
                <Input placeholder="e.g., Mumbai, Maharashtra" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="rating"
                label="Rating"
                rules={[{ required: true, message: 'Please select rating' }]}
              >
                <Select>
                  <Select.Option value={5}>5 Stars</Select.Option>
                  <Select.Option value={4}>4 Stars</Select.Option>
                  <Select.Option value={3}>3 Stars</Select.Option>
                  <Select.Option value={2}>2 Stars</Select.Option>
                  <Select.Option value={1}>1 Star</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="package"
                label="Package/Service"
                rules={[{ required: true, message: 'Please enter package/service name' }]}
              >
                <Input placeholder="e.g., Goa Beach Paradise" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: 'Please enter image URL' }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>

          <Form.Item
            name="text"
            label="Testimonial Text"
            rules={[{ required: true, message: 'Please enter testimonial text' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Enter customer testimonial" 
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button onClick={() => {
                setModalVisible(false)
                form.resetFields()
                setEditingId(null)
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingId ? 'Update' : 'Save'} Testimonial
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  )
}

export default AdminTestimonials

