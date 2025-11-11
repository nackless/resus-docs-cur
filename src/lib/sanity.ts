import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Read configuration from environment. In development or when a SANITY_TOKEN
// is provided we disable the CDN so you can preview drafts and the latest
// changes immediately.
const projectId = import.meta.env.SANITY_PROJECT_ID || 'l4hoyndj'
const dataset = import.meta.env.SANITY_DATASET || 'production'
const token = import.meta.env.SANITY_TOKEN || undefined

// If a token is present we should not use the CDN (we want fresh data and
// the ability to read drafts). In production without a token we can use the
// CDN for speed.
const useCdn = !token && process.env.NODE_ENV === 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn,
  token,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)