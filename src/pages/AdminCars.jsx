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
  Tag,
  Popconfirm,
  message
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'

const { Content } = Layout

const AdminCars = () => {
  const [cars, setCars] = useState([])
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
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'carRentals'))
      const carsData = snapshot.docs.map(doc => ({
        id: doc.id,
        key: doc.id,
        ...doc.data()
      }))
      setCars(carsData)
    } catch (error) {
      console.error('Error fetching cars:', error)
      message.error('Failed to load cars')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (values) => {
    try {
      const carData = {
        ...values,
        price: parseFloat(values.price),
        originalPrice: values.originalPrice ? parseFloat(values.originalPrice) : null,
        rating: parseFloat(values.rating),
        reviews: parseInt(values.reviews),
        year: parseInt(values.year),
        seats: parseInt(values.seats),
        features: typeof values.features === 'string'
          ? values.features.split(',').map(f => f.trim()).filter(f => f)
          : values.features,
        pickupLocations: typeof values.pickupLocations === 'string'
          ? values.pickupLocations.split(',').map(l => l.trim()).filter(l => l)
          : values.pickupLocations,
        createdAt: new Date().toISOString()
      }

      if (editingId) {
        await updateDoc(doc(db, 'carRentals', editingId), carData)
        message.success('Car updated successfully')
      } else {
        await addDoc(collection(db, 'carRentals'), carData)
        message.success('Car added successfully')
      }

      form.resetFields()
      setModalVisible(false)
      setEditingId(null)
      fetchCars()
    } catch (error) {
      console.error('Error saving car:', error)
      message.error('Failed to save car')
    }
  }

  const handleEdit = (car) => {
    setEditingId(car.id)
    form.setFieldsValue({
      ...car,
      features: Array.isArray(car.features) ? car.features.join(', ') : car.features || '',
      pickupLocations: Array.isArray(car.pickupLocations) ? car.pickupLocations.join(', ') : car.pickupLocations || ''
    })
    setModalVisible(true)
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'carRentals', id))
      message.success('Car deleted successfully')
      fetchCars()
    } catch (error) {
      console.error('Error deleting car:', error)
      message.error('Failed to delete car')
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
          alt="Car"
          width={80}
          height={60}
          style={{ objectFit: 'cover', borderRadius: 4 }}
          fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='60'%3E%3Crect fill='%23ddd' width='80' height='60'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E"
        />
      )
    },
    {
      title: 'Car Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <Tag color="blue">{category}</Tag>
    },
    {
      title: 'Price/Day',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₹${price?.toLocaleString('en-IN')}/day`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: 'Seats',
      dataIndex: 'seats',
      key: 'seats',
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
      render: (status) => (
        <Tag color={status === 'Available' ? 'green' : status === 'Limited' ? 'orange' : 'red'}>
          {status}
        </Tag>
      )
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
            title="Are you sure you want to delete this car?"
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
        title="Car Rentals"
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
            Add Car
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={cars}
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1200 }}
        />
      </Card>

      <Modal
        title={editingId ? 'Edit Car' : 'Add New Car'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
          setEditingId(null)
        }}
        footer={null}
        width={1200}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            availability: 'Available',
            insurance: 'Included'
          }}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="name"
                label="Car Name"
                rules={[{ required: true, message: 'Please enter car name' }]}
              >
                <Input placeholder="Enter car name" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select placeholder="Select category">
                  <Select.Option value="Economy Taxi">Economy Taxi</Select.Option>
                  <Select.Option value="Premium Taxi">Premium Taxi</Select.Option>
                  <Select.Option value="Sedan Taxi">Sedan Taxi</Select.Option>
                  <Select.Option value="MPV Taxi">MPV Taxi</Select.Option>
                  <Select.Option value="SUV Taxi">SUV Taxi</Select.Option>
                  <Select.Option value="Budget Taxi">Budget Taxi</Select.Option>
                  <Select.Option value="Luxury">Luxury</Select.Option>
                  <Select.Option value="Premium">Premium</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="year"
                label="Year"
                rules={[{ required: true, message: 'Please enter year' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="Enter year"
                  min={2000}
                  max={new Date().getFullYear() + 1}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="seats"
                label="Seats"
                rules={[{ required: true, message: 'Please enter number of seats' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="Enter number of seats"
                  min={2}
                  max={9}
                />
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

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="price"
                label="Price per Day (₹)"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="Enter price per day"
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="originalPrice"
                label="Original Price (₹)"
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="Enter original price (optional)"
                  min={0}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="mileage"
                label="Mileage"
                rules={[{ required: true, message: 'Please enter mileage' }]}
              >
                <Input placeholder="e.g., 25,000 km" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="availability"
                label="Availability"
                rules={[{ required: true, message: 'Please select availability' }]}
              >
                <Select>
                  <Select.Option value="Available">Available</Select.Option>
                  <Select.Option value="Limited">Limited</Select.Option>
                  <Select.Option value="Sold Out">Sold Out</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="fuel"
                label="Fuel Type"
                rules={[{ required: true, message: 'Please select fuel type' }]}
              >
                <Select placeholder="Select fuel type">
                  <Select.Option value="Petrol">Petrol</Select.Option>
                  <Select.Option value="Diesel">Diesel</Select.Option>
                  <Select.Option value="CNG">CNG</Select.Option>
                  <Select.Option value="Petrol/CNG">Petrol/CNG</Select.Option>
                  <Select.Option value="Electric">Electric</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="transmission"
                label="Transmission"
                rules={[{ required: true, message: 'Please select transmission' }]}
              >
                <Select placeholder="Select transmission">
                  <Select.Option value="Manual">Manual</Select.Option>
                  <Select.Option value="Automatic">Automatic</Select.Option>
                  <Select.Option value="Manual/Automatic">Manual/Automatic</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="rating"
                label="Rating"
                rules={[{ required: true, message: 'Please enter rating' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="Enter rating (0-5)"
                  min={0}
                  max={5}
                  step={0.1}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="reviews"
                label="Reviews Count"
                rules={[{ required: true, message: 'Please enter reviews count' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="Enter number of reviews"
                  min={0}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="features"
            label="Features (comma separated)"
            rules={[{ required: true, message: 'Please enter features' }]}
          >
            <Input placeholder="AC, GPS Navigation, Spacious" />
          </Form.Item>

          <Form.Item
            name="pickupLocations"
            label="Pickup Locations (comma separated)"
            rules={[{ required: true, message: 'Please enter pickup locations' }]}
          >
            <Input placeholder="Delhi, Mumbai, Bangalore" />
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
                {editingId ? 'Update' : 'Save'} Car
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  )
}

export default AdminCars
