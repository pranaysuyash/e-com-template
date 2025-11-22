# Quick Setup Guide

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] PostgreSQL database running
- [ ] OpenAI API key obtained
- [ ] Stripe account created

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env` file:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `OPENAI_API_KEY` - From OpenAI dashboard
- `STRIPE_SECRET_KEY` - From Stripe dashboard
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - From Stripe dashboard

### 3. Initialize Database

```bash
npm run prisma:generate
npm run prisma:push
```

### 4. Create First Admin User

Option A: Use Prisma Studio
```bash
npm run prisma:studio
```

Then create a user record manually.

Option B: Create via SQL
```sql
INSERT INTO "User" (id, email, password, role)
VALUES (
  'cuid-here',
  'admin@example.com',
  -- Hash your password with bcrypt first
  '$2a$10$...',
  'ADMIN'
);
```

### 5. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

### 6. Initial Configuration

1. Sign in at `/admin/dashboard`
2. Go to Settings and configure:
   - Store name
   - Branding colors
   - Logo
3. Go to Themes and select a theme
4. Create your first product

## Testing AI Features

Make sure `OPENAI_API_KEY` is set, then:
1. Create a product
2. Click "Improve with AI" on description
3. Try "Generate Image" with a prompt

## Testing Checkout

1. Add `STRIPE_SECRET_KEY` to `.env`
2. Publish a product
3. Visit storefront: `/store/[your-email]`
4. Click "Buy Now"
5. Use test card: `4242 4242 4242 4242`

## Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check `DATABASE_URL` format
- Ensure database exists

### AI Features Not Working
- Verify `OPENAI_API_KEY` is valid
- Check OpenAI account has credits
- Review API route logs

### Stripe Checkout Fails
- Ensure keys are from same account (test/live)
- Verify `NEXT_PUBLIC_APP_URL` is correct
- Check Stripe dashboard for errors

## Production Checklist

- [ ] Use production Stripe keys
- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Configure S3 for file uploads
- [ ] Set up custom domain
- [ ] Enable database backups
- [ ] Configure error monitoring
- [ ] Add SSL certificate
- [ ] Test all features thoroughly

## Next Steps

1. Customize themes in `src/lib/themes.ts`
2. Add your branding
3. Create products
4. Test checkout flow
5. Deploy to production

## Getting Help

- Check `README.md` for detailed docs
- Review code comments
- Check console for errors
- Verify all environment variables
