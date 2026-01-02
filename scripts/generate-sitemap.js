import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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

// Get base URL from environment variable or use default
const BASE_URL = process.env.SITE_URL || 'https://toursinvaranasi.com'

// Priority and changefreq settings
const PRIORITY_HIGH = '1.0'
const PRIORITY_MEDIUM = '0.8'
const PRIORITY_LOW = '0.6'
const CHANGEFREQ_DAILY = 'daily'
const CHANGEFREQ_WEEKLY = 'weekly'
const CHANGEFREQ_MONTHLY = 'monthly'

// Static routes with their priorities and change frequencies
const staticRoutes = [
  {
    path: '/',
    priority: PRIORITY_HIGH,
    changefreq: CHANGEFREQ_DAILY,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/packages',
    priority: PRIORITY_HIGH,
    changefreq: CHANGEFREQ_WEEKLY,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/car-rental',
    priority: PRIORITY_HIGH,
    changefreq: CHANGEFREQ_WEEKLY,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/contact',
    priority: PRIORITY_MEDIUM,
    changefreq: CHANGEFREQ_MONTHLY,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/terms-conditions',
    priority: PRIORITY_LOW,
    changefreq: CHANGEFREQ_MONTHLY,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/privacy-policy',
    priority: PRIORITY_LOW,
    changefreq: CHANGEFREQ_MONTHLY,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/refund-policy',
    priority: PRIORITY_LOW,
    changefreq: CHANGEFREQ_MONTHLY,
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    path: '/cancellation-policy',
    priority: PRIORITY_LOW,
    changefreq: CHANGEFREQ_MONTHLY,
    lastmod: new Date().toISOString().split('T')[0]
  }
]

async function fetchPackages() {
  try {
    const snapshot = await getDocs(collection(db, 'holidayPackages'))
    const packages = []
    
    snapshot.forEach(doc => {
      const data = doc.data()
      packages.push({
        id: doc.id,
        path: `/package/${doc.id}`,
        priority: PRIORITY_MEDIUM,
        changefreq: CHANGEFREQ_WEEKLY,
        lastmod: data.updatedAt 
          ? new Date(data.updatedAt.seconds * 1000).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0]
      })
    })
    
    return packages
  } catch (error) {
    console.error('Error fetching packages:', error)
    return []
  }
}

function generateSitemapXML(routes) {
  const urls = routes.map(route => {
    const url = `${BASE_URL}${route.path}`.replace(/\/+/g, '/').replace(':/', '://')
    return `  <url>
    <loc>${escapeXML(url)}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`
}

function escapeXML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

async function generateSitemap() {
  console.log('🚀 Starting sitemap generation...')
  console.log(`📍 Base URL: ${BASE_URL}`)
  
  // Fetch dynamic routes (packages)
  console.log('📦 Fetching packages from Firebase...')
  const packages = await fetchPackages()
  console.log(`✅ Found ${packages.length} packages`)
  
  // Combine static and dynamic routes
  const allRoutes = [...staticRoutes, ...packages]
  console.log(`📄 Total routes: ${allRoutes.length}`)
  
  // Generate XML
  const sitemapXML = generateSitemapXML(allRoutes)
  
  // Determine output path
  // For Vite, we want to output to public directory
  const publicDir = join(__dirname, '..', 'public')
  const outputPath = join(publicDir, 'sitemap.xml')
  
  // Write sitemap.xml
  writeFileSync(outputPath, sitemapXML, 'utf-8')
  console.log(`✅ Sitemap generated successfully at: ${outputPath}`)
  console.log(`📊 Total URLs: ${allRoutes.length}`)
  
  // Also update robots.txt
  const robotsPath = join(publicDir, 'robots.txt')
  writeFileSync(robotsPath, generateRobotsTxt(), 'utf-8')
  console.log(`✅ robots.txt updated successfully`)
  
  console.log('🎉 Sitemap generation complete!')
  
  // Close Firebase connection to allow process to exit
  process.exit(0)
}

function generateRobotsTxt() {
  return `# robots.txt for ${BASE_URL}

# Allow all crawlers
User-agent: *
Allow: /

# Disallow admin and private routes
Disallow: /admin/
Disallow: /admin/login

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml

# Crawl-delay (optional, helps prevent server overload)
Crawl-delay: 1
`
}

// Run the generator
generateSitemap().catch(error => {
  console.error('❌ Error generating sitemap:', error)
  process.exit(1)
})
