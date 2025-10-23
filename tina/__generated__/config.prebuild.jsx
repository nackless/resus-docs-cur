var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// tina/config.ts
import { defineConfig } from "tinacms";

// src/lib/tina-cloudinary-store.ts
import { v2 as cloudinary } from "cloudinary";
function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}
var CloudinaryStore = class {
  constructor() {
    __publicField(this, "accept", "image/*");
  }
  async persist(files) {
    return Promise.all(
      files.map(async (file) => {
        try {
          const reader = new FileReader();
          const base64Promise = new Promise((resolve) => {
            reader.onloadend = () => {
              const base64 = reader.result?.toString() || "";
              resolve(base64.replace(/^data:.+;base64,/, ""));
            };
            reader.readAsDataURL(file.file);
          });
          const base64Data = await base64Promise;
          const uploadResult = await cloudinary.uploader.upload(
            "data:image/png;base64," + base64Data,
            {
              public_id: file.file.name.split(".")[0],
              folder: "resus-docs",
              resource_type: "auto"
            }
          );
          return {
            type: "file",
            id: uploadResult.public_id,
            filename: uploadResult.public_id + "." + uploadResult.format,
            directory: "uploads",
            previewSrc: uploadResult.secure_url,
            src: uploadResult.secure_url
          };
        } catch (error) {
          console.error("Cloudinary upload error:", error);
          throw error;
        }
      })
    );
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
      const result = await cloudinary.search.expression("folder:resus-docs").sort_by("created_at", "desc").max_results(500).execute();
      return {
        items: result.resources.map((resource) => ({
          type: "file",
          id: resource.public_id,
          filename: resource.public_id + "." + resource.format,
          directory: "uploads",
          previewSrc: resource.secure_url,
          src: resource.secure_url
        }))
      };
    } catch (error) {
      console.error("Cloudinary list error:", error);
      return { items: [] };
    }
  }
};
var TinaCloudinaryMediaStore = class {
  constructor() {
    __publicField(this, "store", CloudinaryStore);
    configureCloudinary();
  }
};

// tina/config.ts
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var apiURL = process.env.TINA_PUBLIC_IS_LOCAL === "true" ? "http://localhost:4001/graphql" : `https://content.tinajs.io/content/${process.env.TINA_PUBLIC_TINA_CLIENT_ID}/github/${branch}`;
var mediaStore = new TinaCloudinaryMediaStore();
var config_default = defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    loadCustomStore: async () => mediaStore.store
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
