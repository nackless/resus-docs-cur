import { Media, MediaStore } from 'tinacms'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export class CloudinaryMediaStore implements MediaStore {
  async persist(files: Media[]): Promise<Media[]> {
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.directory + '/' + file.filename, {
            public_id: file.filename.split('.')[0],
            folder: 'resus-docs',
            resource_type: 'auto',
          })
          
          return {
            ...file,
            directory: result.public_id,
            filename: result.public_id + '.' + result.format,
            id: result.public_id,
          }
        } catch (error) {
          console.error('Cloudinary upload error:', error)
          throw error
        }
      })
    )
    
    return uploadedFiles
  }

  async delete(media: Media): Promise<void> {
    try {
      await cloudinary.uploader.destroy(media.id)
    } catch (error) {
      console.error('Cloudinary delete error:', error)
      throw error
    }
  }

  async list(): Promise<Media[]> {
    try {
      const result = await cloudinary.search
        .expression('folder:resus-docs')
        .sort_by([['created_at', 'desc']])
        .max_results(500)
        .execute()

      return result.resources.map((resource: any) => ({
        id: resource.public_id,
        filename: resource.public_id + '.' + resource.format,
        directory: resource.public_id,
        type: resource.resource_type,
        size: resource.bytes,
        url: resource.secure_url,
      }))
    } catch (error) {
      console.error('Cloudinary list error:', error)
      return []
    }
  }
}

// Helper function to generate responsive image URLs
export function getCloudinaryImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    crop?: 'fill' | 'fit' | 'scale' | 'crop'
    quality?: 'auto' | number
    format?: 'auto' | 'webp' | 'jpg' | 'png'
  } = {}
): string {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto'
  } = options

  let url = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`
  
  // Add transformations
  const transformations = []
  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (crop) transformations.push(`c_${crop}`)
  if (quality) transformations.push(`q_${quality}`)
  if (format) transformations.push(`f_${format}`)
  
  if (transformations.length > 0) {
    url += `/${transformations.join(',')}`
  }
  
  url += `/${publicId}`
  
  return url
}
