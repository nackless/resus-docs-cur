import { defineConfig } from 'tinacms'

// Your hosting provider likely supplies these as env variables
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main'
const apiURL = process.env.TINA_PUBLIC_IS_LOCAL === 'true' 
  ? 'http://localhost:4001/graphql' 
  : `https://content.tinajs.io/content/${process.env.TINA_PUBLIC_TINA_CLIENT_ID}/github/${branch}`

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: 'uploads',
    },
  },
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'src/content/blog',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
          },
          {
            type: 'datetime',
            name: 'pubDate',
            label: 'Publish Date',
            required: true,
          },
          {
            type: 'string',
            name: 'heroImage',
            label: 'Hero Image',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
    ],
  },
})
