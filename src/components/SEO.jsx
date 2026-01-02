import { useEffect } from 'react'

/**
 * SEO Component for dynamic meta tags
 * Works with React 19 and doesn't require react-helmet
 */
const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  canonical,
  structuredData
}) => {
  const baseUrl = 'https://toursinvaranasi.com'
  const siteName = 'Varanasi Tours'
  const defaultImage = `${baseUrl}/og-image.jpg`
  
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Premium Travel & Tours`
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const ogImage = image || defaultImage

  useEffect(() => {
    // Update document title
    document.title = fullTitle

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let meta = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // Primary Meta Tags
    updateMetaTag('title', fullTitle)
    updateMetaTag('description', description || 'Discover incredible India with Varanasi Tours. Premium holiday packages, car rental services, and unforgettable travel experiences.')
    if (keywords) {
      updateMetaTag('keywords', keywords)
    }

    // Open Graph Tags
    updateMetaTag('og:title', fullTitle, true)
    updateMetaTag('og:description', description || 'Discover incredible India with Varanasi Tours.', true)
    updateMetaTag('og:image', ogImage, true)
    updateMetaTag('og:url', fullUrl, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:site_name', siteName, true)
    updateMetaTag('og:locale', 'en_IN', true)

    // Twitter Card Tags
    updateMetaTag('twitter:card', 'summary_large_image', true)
    updateMetaTag('twitter:title', fullTitle, true)
    updateMetaTag('twitter:description', description || 'Discover incredible India with Varanasi Tours.', true)
    updateMetaTag('twitter:image', ogImage, true)

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonical || fullUrl)

    // Add structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"][data-seo="true"]')
      if (!script) {
        script = document.createElement('script')
        script.setAttribute('type', 'application/ld+json')
        script.setAttribute('data-seo', 'true')
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(structuredData)
    }

    // Cleanup function
    return () => {
      // Note: We don't remove meta tags on unmount as they should persist
      // The next page will update them
    }
  }, [fullTitle, description, keywords, ogImage, fullUrl, type, canonical, structuredData])

  return null // This component doesn't render anything
}

export default SEO
