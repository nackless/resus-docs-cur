// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'https://resusdocs.com',
    integrations: [],
    vite: {
        define: {
            'import.meta.env.CLOUDINARY_CLOUD_NAME': JSON.stringify(process.env.CLOUDINARY_CLOUD_NAME || 'your-cloud-name')
        }
    }
});
