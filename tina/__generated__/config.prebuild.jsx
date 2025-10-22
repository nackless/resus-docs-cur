// tina/config.ts
import { defineConfig } from "tinacms";

// src/lib/cloudinary-media-store.ts
import "tinacms";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
var CloudinaryMediaStore = class {
  async persist(files) {
    const uploadedFiles = await Promise.all(
      files.map(async (file) => {
        try {
          const result = await cloudinary.uploader.upload(file.directory + "/" + file.filename, {
            public_id: file.filename.split(".")[0],
            folder: "resus-docs",
            resource_type: "auto"
          });
          return {
            ...file,
            directory: result.public_id,
            filename: result.public_id + "." + result.format,
            id: result.public_id
          };
        } catch (error) {
          console.error("Cloudinary upload error:", error);
          throw error;
        }
      })
    );
    return uploadedFiles;
  }
  async delete(media) {
    try {
      await cloudinary.uploader.destroy(media.id);
    } catch (error) {
      console.error("Cloudinary delete error:", error);
      throw error;
    }
  }
  async list() {
    try {
      const result = await cloudinary.search.expression("folder:resus-docs").sort_by([["created_at", "desc"]]).max_results(500).execute();
      return result.resources.map((resource) => ({
        id: resource.public_id,
        filename: resource.public_id + "." + resource.format,
        directory: resource.public_id,
        type: resource.resource_type,
        size: resource.bytes,
        url: resource.secure_url
      }));
    } catch (error) {
      console.error("Cloudinary list error:", error);
      return [];
    }
  }
};

// tina/config.ts
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
    loadCustomStore: async () => {
      return new CloudinaryMediaStore();
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
