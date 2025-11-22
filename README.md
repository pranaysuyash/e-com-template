# AI-Powered E-Commerce Admin Template

A comprehensive, whitelabel e-commerce platform with AI-powered features for product management, multiple theme variants, and full customization capabilities.

## 🚀 Features

### Admin Panel
- **Product Management**: Create, edit, and manage products with rich media support
- **AI-Powered Content**:
  - AI content improvement for product descriptions
  - AI image generation for product photos
  - AI-powered image variants
  - SEO optimization
- **Multi-Image Upload**: Drag & drop support with cloud storage integration
- **Inventory Management**: Track stock levels and SKUs
- **Product Publishing**: Draft, publish, or archive products

### Theming System
Choose from 4 professionally designed themes:
- **Modern**: Clean, minimalist design with bold typography
- **Classic**: Timeless design with elegant serif fonts
- **Minimal**: Ultra-clean design with maximum white space
- **Bold**: Vibrant colors and strong visual hierarchy

Each theme includes:
- Custom color schemes
- Typography settings
- Layout configurations
- Component styling options

### Whitelabel Features
- **Custom Branding**: Upload your own logo and brand colors
- **Custom Domain**: Connect your own domain name
- **Personalization**: Full control over store appearance
- **Contact Information**: Add email, phone, and address
- **Social Links**: Connect social media profiles

### Storefront
- **Dynamic Theming**: Automatically applies selected theme
- **Responsive Design**: Mobile-first, works on all devices
- **Product Catalog**: Beautiful product grid with filtering
- **Product Pages**: Rich product detail pages with gallery
- **Shopping Cart**: Full checkout integration with Stripe

### Payment Integration
- Stripe checkout integration
- Secure payment processing
- Order management
- Payment tracking

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- OpenAI API key (for AI features)
- Stripe account (for payments)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd e-com-template
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and configure the following:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce_db?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"

# OpenAI API (for AI features)
OPENAI_API_KEY="sk-your-openai-api-key"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your-key"
STRIPE_SECRET_KEY="sk_test_your-key"
STRIPE_WEBHOOK_SECRET="whsec_your-webhook-secret"

# File Upload
UPLOAD_STORAGE="local" # or "s3"
UPLOAD_PATH="./public/uploads"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Set up the database

Generate Prisma client and push schema:

```bash
npm run prisma:generate
npm run prisma:push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Usage Guide

### Creating Your First User

Since authentication is required, you'll need to create a user directly in the database or add a signup page. For development, you can use Prisma Studio:

```bash
npm run prisma:studio
```

Create a user with a hashed password using bcrypt.

### Admin Panel

Access the admin panel at `/admin/dashboard` after signing in.

#### Adding Products

1. Navigate to **Products** → **Add Product**
2. Fill in product details:
   - Title, description, pricing
   - Upload images or generate with AI
   - Set inventory levels
   - Add attributes and variants
3. Use AI features:
   - Click "Improve with AI" to enhance descriptions
   - Generate product images from text prompts
   - Create image variants
4. Set status to "Published" when ready
5. Click **Save**

#### Choosing a Theme

1. Navigate to **Themes**
2. Preview available themes
3. Click "Use This Theme" on your preferred option
4. Theme applies instantly to your storefront

#### Customizing Branding

1. Navigate to **Settings**
2. Configure:
   - Store name and description
   - Logo URL
   - Brand colors (primary, secondary, accent)
   - Custom domain
   - Contact information
3. Click **Save Settings**

### Storefront

Access your storefront at `/store/[your-email]` or your custom domain.

Customers can:
- Browse products
- View detailed product pages
- Add to cart and checkout via Stripe
- See your branding and theme

## 🏗️ Project Structure

```
e-com-template/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── admin/             # Admin panel pages
│   │   ├── api/               # API routes
│   │   ├── store/             # Storefront pages
│   │   └── auth/              # Authentication pages
│   ├── components/
│   │   ├── ui/                # Reusable UI components
│   │   └── admin/             # Admin-specific components
│   ├── lib/
│   │   ├── ai/                # AI integrations (OpenAI)
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── prisma.ts          # Prisma client
│   │   ├── themes.ts          # Theme definitions
│   │   ├── upload.ts          # File upload handlers
│   │   └── utils.ts           # Utility functions
│   └── types/
│       └── index.ts           # TypeScript types
├── public/
│   └── uploads/               # Uploaded files (local storage)
└── package.json
```

## 🎨 Theming

### Available Themes

Each theme is fully customizable and includes:
- Color scheme
- Typography
- Layout settings
- Component styles

Themes are defined in `src/lib/themes.ts`. You can:
- Modify existing themes
- Add new themes
- Create custom theme variants

### Adding a New Theme

1. Edit `src/lib/themes.ts`
2. Add a new theme object with configuration
3. Theme becomes immediately available in the admin panel

## 🤖 AI Features

### Content Improvement

Uses GPT-4 to enhance product descriptions:
- Makes content more engaging
- Optimizes for SEO
- Maintains original information
- Professional copywriting style

### Image Generation

Generate product images using DALL-E 3:
- Describe the product you want
- AI generates high-quality product photos
- Commercial-style photography
- Professional backgrounds

### Image Variants

Create multiple variations of product images:
- Different angles
- Color variations
- Style options

## 💳 Payment Setup

### Stripe Configuration

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe dashboard
3. Add keys to `.env`:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
4. Configure webhook for order processing (optional)

### Testing Payments

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any Node.js hosting platform:
- Railway
- Render
- Heroku
- AWS
- DigitalOcean

Ensure you:
1. Set all environment variables
2. Run database migrations
3. Configure file storage (S3 for production)

## 📦 Database Migrations

When making schema changes:

```bash
npm run prisma:generate
npm run prisma:push
```

For production, use Prisma Migrate:

```bash
npx prisma migrate dev --name your_migration_name
npx prisma migrate deploy
```

## 🔒 Security

- NextAuth handles authentication
- Passwords hashed with bcrypt
- API routes protected with session checks
- Stripe handles payment security
- Environment variables for sensitive data

## 🛡️ Best Practices

1. **Never commit `.env` file**
2. **Use environment variables for secrets**
3. **Test with Stripe test mode before going live**
4. **Regularly update dependencies**
5. **Back up your database**
6. **Use S3 or similar for production file storage**

## 📖 API Routes

### Products
- `GET /api/products` - List all products
- `POST /api/products` - Create product
- `GET /api/products/[id]` - Get product details
- `PATCH /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### AI
- `POST /api/ai/improve-content` - Improve text content
- `POST /api/ai/generate-image` - Generate product image

### Store
- `PATCH /api/store/theme` - Update store theme
- `PATCH /api/store/settings` - Update store settings

### Checkout
- `POST /api/checkout` - Create Stripe checkout session

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🆘 Support

For issues or questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments

## 🗺️ Roadmap

Future features planned:
- [ ] Email notifications
- [ ] Order tracking
- [ ] Customer accounts
- [ ] Product reviews
- [ ] Analytics dashboard
- [ ] Multi-currency support
- [ ] Advanced SEO tools
- [ ] Bulk product import
- [ ] Mobile app
- [ ] Marketing integrations

## 🎯 Key Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **UI**: Tailwind CSS
- **AI**: OpenAI GPT-4 & DALL-E 3
- **Payments**: Stripe
- **Deployment**: Vercel-ready

---

Built with ❤️ for modern e-commerce
