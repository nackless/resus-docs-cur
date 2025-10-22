// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var apiURL = process.env.TINA_PUBLIC_IS_LOCAL === "true" ? "http://localhost:4001/graphql" : `https://content.tinajs.io/content/${process.env.TINA_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;
var config_default = defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
    basePath: "/admin"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        path: "src/content/blog",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Publish Date",
            required: true
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            required: true
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image"
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              component: "tags"
            }
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "cardiology",
              "neurology",
              "pediatrics",
              "general",
              "nutrition",
              "mental-health",
              "oncology"
            ],
            required: true
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
