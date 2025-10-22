# Resus Docs - Medical Blog with TinaCMS

A modern medical blog built with Astro and TinaCMS for easy content management and mobile publishing.

## 🚀 Features

- **Astro Framework** - Fast, modern static site generation
- **TinaCMS** - Visual content editing with mobile support
- **Medical Content** - Specialized for healthcare professionals
- **Responsive Design** - Works perfectly on all devices
- **SEO Optimized** - Built for search engine visibility

## 📱 Mobile Publishing

TinaCMS provides excellent mobile editing capabilities:
- Touch-friendly interface
- Real-time preview
- Offline editing support
- Progressive Web App features

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

2. **Set up TinaCMS:**
   ```bash
   # Copy environment variables
   cp .env.example .env.local
   
   # Edit .env.local with your TinaCMS credentials
   ```

3. **Run development server:**
   ```bash
   # Start TinaCMS with Astro
   npm run tina-dev
   
   # Or just Astro
   npm run dev
   ```

4. **Access the admin panel:**
   - Visit `http://localhost:4321/admin` for TinaCMS editor
   - Visit `http://localhost:4321` for your blog

## 📝 Content Management

### Blog Posts
- **Title** - Post title
- **Description** - SEO description
- **Author** - Post author
- **Category** - Medical specialty
- **Tags** - Searchable tags
- **Featured Image** - Hero image
- **Content** - Rich text editor with markdown support

### Categories
- Cardiology
- Neurology
- Pediatrics
- General Medicine
- Nutrition
- Mental Health
- Oncology

## 🌐 Deployment to Netlify

### Automatic Deployment

1. **Connect to Netlify:**
   - Push your code to GitHub
   - Connect your repo to Netlify
   - Netlify will auto-deploy on every push

2. **Set Environment Variables in Netlify:**
   ```
   TINA_PUBLIC_TINA_CLIENT_ID = your-client-id
   TINA_TOKEN = your-token
   ```

3. **Build Settings:**
   - Build Command: `npm run tina-build`
   - Publish Directory: `dist`

### Manual Deployment

```bash
# Build for production
npm run tina-build

# Deploy to Netlify
npx netlify deploy --prod --dir=dist
```

## 📁 Project Structure

```
resus-docs/
├── src/
│   ├── components/     # Astro components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Astro pages
│   └── content/
│       └── blog/       # Markdown blog posts
├── tina/
│   └── config.ts       # TinaCMS configuration
├── public/             # Static assets
├── netlify.toml        # Netlify configuration
└── package.json
```

## 🔧 TinaCMS Configuration

The TinaCMS configuration is in `tina/config.ts` and includes:
- Blog post schema
- Media management
- Content validation
- Mobile-optimized editing

## 📱 Mobile Editing

TinaCMS provides:
- **Responsive Editor** - Works on all screen sizes
- **Touch Interface** - Optimized for mobile devices
- **Real-time Preview** - See changes instantly
- **Offline Support** - Edit without internet connection

## 🎨 Customization

### Styling
- Edit CSS in component files
- Global styles in `src/layouts/BaseLayout.astro`
- Responsive design included

### Content Types
- Modify `tina/config.ts` to add new content types
- Add new fields to existing collections
- Customize the editing interface

## 🚀 Performance

- **Astro** - Zero JavaScript by default
- **Static Generation** - Pre-built pages for speed
- **Image Optimization** - Automatic image processing
- **CDN Ready** - Works with any CDN

## 📞 Support

For issues with:
- **Astro**: [Astro Documentation](https://docs.astro.build)
- **TinaCMS**: [TinaCMS Documentation](https://tina.io/docs)
- **Netlify**: [Netlify Documentation](https://docs.netlify.com)

## 📄 License

MIT License - feel free to use this template for your medical blog!