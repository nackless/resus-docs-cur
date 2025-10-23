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
  const query = `*[_type == "post" && slug.current == "${slug}"][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    image,
    publishedAt,
    tags,
    author->
  }`
  return await client.fetch(query)
}