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
  Switch, 
  Select,
  Row,
  Col,
  Image,
  Tag,
  Popconfirm,
  message,
  Collapse,
  Divider
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, GlobalOutlined } from '@ant-design/icons'
import RichTextEditor from '../components/RichTextEditor'

const { Content } = Layout
const { TextArea } = Input
const { Panel } = Collapse

const AdminPackages = () => {
  const [packages, setPackages] = useState([])
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
    fetchPackages()
  }, [])

  const fetchPackages = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'holidayPackages'))
      const packagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        key: doc.id,
        ...doc.data()
      }))
      setPackages(packagesData)
    } catch (error) {
      console.error('Error fetching packages:', error)
      message.error('Failed to load packages')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (values) => {
    try {
      const packageData = {
        ...values,
        price: parseFloat(values.price),
        originalPrice: values.originalPrice ? parseFloat(values.originalPrice) : null,
        rating: parseFloat(values.rating),
        reviews: parseInt(values.reviews),
        features: typeof values.features === 'string' 
          ? values.features.split(',').map(f => f.trim()).filter(f => f)
          : values.features,
        highlights: typeof values.highlights === 'string'
          ? values.highlights.split(',').map(h => h.trim()).filter(h => h)
          : values.highlights,
        metaKeywords: typeof values.metaKeywords === 'string' && values.metaKeywords
          ? values.metaKeywords.split(',').map(k => k.trim()).filter(k => k)
          : values.metaKeywords || [],
        createdAt: new Date().toISOString()
      }

      if (editingId) {
        await updateDoc(doc(db, 'holidayPackages', editingId), packageData)
        message.success('Package updated successfully')
      } else {
        await addDoc(collection(db, 'holidayPackages'), packageData)
        message.success('Package added successfully')
      }

      form.resetFields()
      setModalVisible(false)
      setEditingId(null)
      fetchPackages()
    } catch (error) {
      console.error('Error saving package:', error)
      message.error('Failed to save package')
    }
  }

  const handleEdit = (pkg) => {
    setEditingId(pkg.id)
    setModalVisible(true)
    // Use setTimeout to ensure modal is rendered before setting form values
    setTimeout(() => {
      form.setFieldsValue({
        ...pkg,
        features: Array.isArray(pkg.features) ? pkg.features.join(', ') : pkg.features || '',
        highlights: Array.isArray(pkg.highlights) ? pkg.highlights.join(', ') : pkg.highlights || '',
        metaKeywords: Array.isArray(pkg.metaKeywords) ? pkg.metaKeywords.join(', ') : pkg.metaKeywords || ''
      })
    }, 100)
  }

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'holidayPackages', id))
      message.success('Package deleted successfully')
      fetchPackages()
    } catch (error) {
      console.error('Error deleting package:', error)
      message.error('Failed to delete package')
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
          alt="Package"
          width={80}
          height={60}
          style={{ objectFit: 'cover', borderRadius: 4 }}
          fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='60'%3E%3Crect fill='%23ddd' width='80' height='60'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E"
        />
      )
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      sorter: (a, b) => (a.city || '').localeCompare(b.city || ''),
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      sorter: (a, b) => (a.state || '').localeCompare(b.state || ''),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₹${price?.toLocaleString('en-IN')}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      sorter: (a, b) => a.rating - b.rating,
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
      title: 'Best Seller',
      dataIndex: 'bestSeller',
      key: 'bestSeller',
      render: (value) => value ? <Tag color="gold">Yes</Tag> : <Tag>No</Tag>
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
            title="Are you sure you want to delete this package?"
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
        title="Holiday Packages"
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
            Add Package
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={packages}
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1200 }}
        />
      </Card>

      <Modal
        title={editingId ? 'Edit Package' : 'Add New Package'}
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
            bestSeller: false
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please enter package title' }]}
              >
                <Input placeholder="Enter package title" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="city"
                label="City"
                rules={[{ required: true, message: 'Please enter city' }]}
              >
                <Input placeholder="Enter city" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="state"
                label="State"
                rules={[{ required: true, message: 'Please enter state' }]}
              >
                <Input placeholder="Enter state" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="duration"
                label="Duration"
                rules={[{ required: true, message: 'Please enter duration' }]}
              >
                <Input placeholder="e.g., 5 Days / 4 Nights" />
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

          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: 'Please enter image URL' }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>

          <Form.Item
            name="shortSummary"
            label="Short Summary"
            rules={[{ required: true, message: 'Please enter short summary' }]}
            help="A brief summary that appears on package cards (2-3 lines)"
          >
            <TextArea rows={2} placeholder="Enter a short summary of the package" maxLength={200} showCount />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
            help="Full detailed description with rich text formatting support"
          >
            <RichTextEditor 
              key={editingId || 'new'} 
              placeholder="Enter detailed package description..." 
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="price"
                label="Price (₹)"
                rules={[{ required: true, message: 'Please enter price' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="Enter price"
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

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="bestSeller"
                label="Best Seller"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="features"
            label="Features (comma separated)"
            rules={[{ required: true, message: 'Please enter features' }]}
          >
            <Input placeholder="Beach Resorts, All Meals, Water Sports" />
          </Form.Item>

          <Form.Item
            name="highlights"
            label="Highlights (comma separated)"
            rules={[{ required: true, message: 'Please enter highlights' }]}
          >
            <Input placeholder="Baga Beach, Fort Aguada" />
          </Form.Item>

          <Form.Item
            name="cancellation"
            label="Cancellation Policy"
            rules={[{ required: true, message: 'Please enter cancellation policy' }]}
          >
            <Input placeholder="Free cancellation up to 7 days" />
          </Form.Item>

          <Divider orientation="left" style={{ marginTop: 32, marginBottom: 24 }}>
            <GlobalOutlined style={{ marginRight: 8 }} />
            SEO Settings (Optional)
          </Divider>

          <Collapse defaultActiveKey={[]} ghost>
            <Panel header="Search Engine Optimization" key="seo">
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="metaTitle"
                    label="Meta Title"
                    help="Title for search engines (50-60 characters recommended)"
                    rules={[
                      { max: 60, message: 'Meta title should be 60 characters or less' }
                    ]}
                  >
                    <Input 
                      placeholder="e.g., Amazing Varanasi Tour Package - Book Now"
                      showCount
                      maxLength={60}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="metaDescription"
                    label="Meta Description"
                    help="Description for search engines (150-160 characters recommended)"
                    rules={[
                      { max: 160, message: 'Meta description should be 160 characters or less' }
                    ]}
                  >
                    <TextArea 
                      rows={3}
                      placeholder="e.g., Experience the spiritual charm of Varanasi with our curated tour package..."
                      showCount
                      maxLength={160}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="metaKeywords"
                    label="Meta Keywords"
                    help="Comma-separated keywords for SEO (e.g., varanasi, tour, package, travel)"
                  >
                    <Input placeholder="varanasi tour, holiday package, travel india, spiritual tourism" />
                  </Form.Item>
                </Col>
              </Row>

              <Divider orientation="left" style={{ marginTop: 24, marginBottom: 16 }}>
                Open Graph (Social Media Sharing)
              </Divider>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="ogTitle"
                    label="Open Graph Title"
                    help="Title for social media sharing (optional - uses Meta Title if not set)"
                  >
                    <Input placeholder="Leave empty to use Meta Title" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="ogDescription"
                    label="Open Graph Description"
                    help="Description for social media sharing (optional - uses Meta Description if not set)"
                  >
                    <TextArea 
                      rows={3}
                      placeholder="Leave empty to use Meta Description"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="ogImage"
                    label="Open Graph Image URL"
                    help="Image for social media sharing (1200x630px recommended). Leave empty to use package image."
                  >
                    <Input placeholder="https://example.com/image.jpg" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="canonicalUrl"
                    label="Canonical URL"
                    help="Preferred URL for this page (optional - auto-generated if not set)"
                  >
                    <Input placeholder="https://toursinvaranasi.com/package/varanasi-spiritual-tour" />
                  </Form.Item>
                </Col>
              </Row>
            </Panel>
          </Collapse>

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
                {editingId ? 'Update' : 'Save'} Package
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  )
}

export default AdminPackages
