import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const Breadcrumbs = ({ items = [] }) => {
  const location = useLocation()
  
  // Auto-generate breadcrumbs from pathname if items not provided
  const generateBreadcrumbs = () => {
    if (items.length > 0) return items
    
    const paths = location.pathname.split('/').filter(Boolean)
    const breadcrumbs = [
      { label: 'Home', path: '/' }
    ]
    
    let currentPath = ''
    paths.forEach((path, index) => {
      currentPath += `/${path}`
      const label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      
      breadcrumbs.push({
        label: label,
        path: currentPath,
        isLast: index === paths.length - 1
      })
    })
    
    return breadcrumbs
  }
  
  const breadcrumbs = generateBreadcrumbs()
  
  if (breadcrumbs.length <= 1) return null
  
  return (
    <nav className="bg-gray-50 border-b border-gray-200 py-3" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1
            
            return (
              <li key={crumb.path} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                )}
                {isLast ? (
                  <span className="text-gray-600 font-medium" aria-current="page">
                    {index === 0 && <Home className="h-4 w-4 inline mr-1" />}
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    to={crumb.path}
                    className="text-primary-600 hover:text-primary-700 transition-colors flex items-center"
                  >
                    {index === 0 && <Home className="h-4 w-4 mr-1" />}
                    {crumb.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

export default Breadcrumbs
