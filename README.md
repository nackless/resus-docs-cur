# Resus Docs - Medical Blog with Sanity

A modern medical blog built with [Astro](https://astro.build) and [Sanity CMS](https://www.sanity.io) for fast performance, easy content management, and mobile publishing.

## 🚀 Features

- **Astro Framework** - Fast, modern static site generation with zero JavaScript by default
- **Sanity CMS** - Headless, API-first CMS for structured medical content and real-time collaboration
- **Medical Content** - Specialized for healthcare professionals
- **Responsive Design** - Works perfectly on all devices
- **SEO Optimized** - Built for search engine visibility

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo>
   cd resus-docs
   npm install
   ```

2. **Set up Environment Variables:**
   ```bash
   # Copy environment variables (if .env.example exists)
   cp .env.example .env
   
   # Provide your Sanity project credentials inside .env
   SANITY_PROJECT_ID="your-project-id" # e.g. l4hoyndj
   SANITY_DATASET="production"
   ```

3. **Run development server:**
   ```bash
   # Start the Astro dev server
   npm run dev
   ```

4. **Access your blog locally:**
   - Visit `http://localhost:4321` to view your site

## 📝 Content Management

Your content is managed remotely via Sanity Studio. Log into your project's Sanity dashboard to create, edit, or delete:
- **Blog Posts**: Titles, specific categories, excerpts, hero images, and Markdown/Rich text body.
- **Categories**: Such as Cardiology, Neurology, Pediatrics, etc.

## 🌐 Deployment to Netlify or Vercel

### Automatic Deployment

1. **Connect to your Hosting Provider:**
   - Push your code to GitHub
   - Connect your repo to Netlify, Vercel, or any other hosting solution
   - This setup will auto-deploy your site on every push

2. **Set Environment Variables in your Host:**
   Provide `SANITY_PROJECT_ID` and `SANITY_DATASET` inside your host's dashboard.

3. **Build Settings:**
   - Build Command: `npm run build`
   - Publish Directory: `dist`

### Manual Deployment

```bash
# Build for production
npm run build

# To quickly preview the build locally
npm run preview
```

## 📁 Project Structure

```
resus-docs/
├── src/
│   ├── components/     # Astro UI components
│   ├── layouts/        # Global page layouts
│   ├── pages/          # Astro page routes
│   └── lib/            # Sanity utilities, queries, and parsers
├── public/             # Static assets (fonts, images, icons)
├── astro.config.mjs    # Astro and Sanity integration configs
└── package.json
```

## 🚀 Performance

- **Astro** - Zero JavaScript by default
- **Static Generation** - Pre-built pages for maximum speed
- **Image Optimization** - Sanity CDN processing for fast images
- **CDN Ready** - Deploy anywhere, instantly

## 📞 Support

For issues with:
- **Astro**: [Astro Documentation](https://docs.astro.build)
- **Sanity**: [Sanity CMS Documentation](https://www.sanity.io/docs)

## 📄 License

MIT License - feel free to use this template for your medical blog!