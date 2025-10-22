// Cloudinary utility functions for frontend image optimization
// This doesn't interfere with TinaCMS admin functionality

export interface CloudinaryOptions {
  width?: number
  height?: number
  crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb' | 'lfill' | 'limit'
  quality?: 'auto' | number
  format?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif'
  gravity?: 'auto' | 'face' | 'center' | 'north' | 'south' | 'east' | 'west'
  radius?: number
  effect?: string
}

/**
 * Generate a Cloudinary URL for image optimization
 * @param publicId - The Cloudinary public ID of the image
 * @param options - Transformation options
 * @returns Optimized Cloudinary URL
 */
export function getCloudinaryUrl(publicId: string, options: CloudinaryOptions = {}): string {
  const cloudName = 'dipqcxcdy' // Your Cloudinary cloud name
  
  if (!publicId) {
    return ''
  }
  
  // If it's already a full URL, return as is
  if (publicId.startsWith('http')) {
    return publicId
  }
  
  // If it's a local image path, return as is (for fallback)
  if (publicId.startsWith('/') || publicId.startsWith('./')) {
    return publicId
  }
  
  let url = `https://res.cloudinary.com/${cloudName}/image/upload`
  
  const transformations = []
  
  // Add transformations
  if (options.width) transformations.push(`w_${options.width}`)
  if (options.height) transformations.push(`h_${options.height}`)
  if (options.crop) transformations.push(`c_${options.crop}`)
  if (options.quality) transformations.push(`q_${options.quality}`)
  if (options.format) transformations.push(`f_${options.format}`)
  if (options.gravity) transformations.push(`g_${options.gravity}`)
  if (options.radius) transformations.push(`r_${options.radius}`)
  if (options.effect) transformations.push(`e_${options.effect}`)
  
  if (transformations.length > 0) {
    url += `/${transformations.join(',')}`
  }
  
  url += `/${publicId}`
  
  return url
}

/**
 * Generate responsive image URLs for different screen sizes
 * @param publicId - The Cloudinary public ID
 * @param baseOptions - Base transformation options
 * @returns Object with different size URLs
 */
export function getResponsiveCloudinaryUrls(
  publicId: string, 
  baseOptions: CloudinaryOptions = {}
) {
  return {
    mobile: getCloudinaryUrl(publicId, { ...baseOptions, width: 400 }),
    tablet: getCloudinaryUrl(publicId, { ...baseOptions, width: 800 }),
    desktop: getCloudinaryUrl(publicId, { ...baseOptions, width: 1200 }),
    large: getCloudinaryUrl(publicId, { ...baseOptions, width: 1600 }),
  }
}

/**
 * Generate a srcset string for responsive images
 * @param publicId - The Cloudinary public ID
 * @param baseOptions - Base transformation options
 * @returns srcset string
 */
export function getCloudinarySrcset(publicId: string, baseOptions: CloudinaryOptions = {}): string {
  const urls = getResponsiveCloudinaryUrls(publicId, baseOptions)
  return `${urls.mobile} 400w, ${urls.tablet} 800w, ${urls.desktop} 1200w, ${urls.large} 1600w`
}

/**
 * Extract public ID from a Cloudinary URL
 * @param url - Full Cloudinary URL
 * @returns Public ID or null if not a Cloudinary URL
 */
export function extractCloudinaryPublicId(url: string): string | null {
  if (!url || !url.includes('cloudinary.com')) {
    return null
  }
  
  const match = url.match(/\/upload\/[^\/]*\/(.+)$/)
  return match ? match[1] : null
}
