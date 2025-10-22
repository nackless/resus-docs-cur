var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/lib/cloudinary-media-store.ts
var cloudinary_media_store_exports = {};
__export(cloudinary_media_store_exports, {
  CloudinaryMediaStore: () => CloudinaryMediaStore,
  getCloudinaryImageUrl: () => getCloudinaryImageUrl
});
import "tinacms";
import { v2 as cloudinary } from "cloudinary";
function getCloudinaryImageUrl(publicId, options = {}) {
  const {
    width,
    height,
    crop = "fill",
    quality = "auto",
    format = "auto"
  } = options;
  let url = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`;
  const transformations = [];
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);
  if (transformations.length > 0) {
    url += `/${transformations.join(",")}`;
  }
  url += `/${publicId}`;
  return url;
}
var CloudinaryMediaStore;
var init_cloudinary_media_store = __esm({
  "src/lib/cloudinary-media-store.ts"() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    CloudinaryMediaStore = class {
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
  }
});

// tina/config.ts
init_cloudinary_media_store();
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
    loadCustomStore: async () => {
      const { CloudinaryMediaStore: CloudinaryMediaStore3 } = await Promise.resolve().then(() => (init_cloudinary_media_store(), cloudinary_media_store_exports));
      return CloudinaryMediaStore3;
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
