// @ts-check
import { defineConfig } from 'astro/config';
import sanity from 'astro-sanity';

// https://astro.build/config
export default defineConfig({
    output: 'static',
    integrations: [
        sanity({
            projectId: process.env.SANITY_PROJECT_ID || 'l4hoyndj',
            dataset: process.env.SANITY_DATASET || 'production',
            apiVersion: '2024-01-01',
            useCdn: true,
        })
    ],
});
