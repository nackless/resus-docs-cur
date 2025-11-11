import { client } from './sanity'

export async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    categories[]->{
      title
    },
    author->{
      name,
      image,
      bio
    }
  }`
  return await client.fetch(query)
}

export async function getPostBySlug(slug: string) {
  // Return fields that match the shape used by the site templates
  const query = `*[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    excerpt,
    body,            // portable text body (used in templates)
    content,         // fallback/legacy field name
    mainImage,       // same name as getPosts
    image,           // legacy image field fallback
    publishedAt,
    tags,
    categories[]->{ title },
    author->{ name, image, bio }
  }`
  return await client.fetch(query)
}