import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config()

const projectId = process.env.SANITY_PROJECT_ID || 'l4hoyndj'
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_TOKEN || undefined

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false, // ensure fresh data
  token,
})

const slug = process.argv[2]
if (!slug) {
  console.error('Usage: node scripts/inspect-sanity-post.mjs <slug>')
  process.exit(1)
}

async function run() {
  try {
    const query = `*[_type == "post" && slug.current == $slug][0] { _id, _rev, _updatedAt, _createdAt, _type, title, slug, excerpt, body, content, mainImage, image, publishedAt, categories[]->{title}, author->{name, image, bio} }`
    const post = await client.fetch(query, { slug })
    console.log('Raw post object:')
    console.log(JSON.stringify(post, null, 2))
  } catch (err) {
    console.error('Error fetching post:', err)
    process.exit(1)
  }
}

run()
