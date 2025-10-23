import type { Media, MediaList, MediaStore, MediaUploadOptions } from 'tinacms'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })
}

class CloudinaryStore implements MediaStore {
  accept = 'image/*'
  
  async persist(files: MediaUploadOptions[]): Promise<Media[]> {
    return Promise.all(
      files.map(async (file) => {
        try {
          // Convert file to base64 string for Cloudinary
          const reader = new FileReader()
          const base64Promise = new Promise<string>((resolve) => {
            reader.onloadend = () => {
              // Remove data URL prefix if present
              const base64 = reader.result?.toString() || ''
              resolve(base64.replace(/^data:.+;base64,/, ''))
            }
            reader.readAsDataURL(file.file)
          })
          
          const base64Data = await base64Promise

          // Handle file upload
          const uploadResult = await cloudinary.uploader.upload(
            'data:image/png;base64,' + base64Data,
            {
              public_id: file.file.name.split('.')[0],
              folder: 'resus-docs',
              resource_type: 'auto',
            }
          )

          // Return Media object in TinaCMS expected format
          return {
            type: 'file',
            id: uploadResult.public_id,
            filename: uploadResult.public_id + '.' + uploadResult.format,
            directory: 'uploads',
            previewSrc: uploadResult.secure_url,
            src: uploadResult.secure_url,
          }
        } catch (error) {
          console.error('Cloudinary upload error:', error)
          throw error
        }
      })
    )
  }

  async delete(media: Media): Promise<void> {
    try {
      await cloudinary.uploader.destroy(media.id)
    } catch (error) {
      console.error('Cloudinary delete error:', error)
      throw error
    }
  }

  async list(): Promise<MediaList> {
    try {
      const result = await cloudinary.search
        .expression('folder:resus-docs')
        .sort_by('created_at', 'desc')
        .max_results(500)
        .execute()

      return {
        items: result.resources.map((resource: any) => ({
          type: 'file',
          id: resource.public_id,
          filename: resource.public_id + '.' + resource.format,
          directory: 'uploads',
          previewSrc: resource.secure_url,
          src: resource.secure_url,
        }))
      }
    } catch (error) {
      console.error('Cloudinary list error:', error)
      return { items: [] }
    }
  }
}

export class TinaCloudinaryMediaStore {
  constructor() {
    configureCloudinary()
  }

  store = CloudinaryStore
}