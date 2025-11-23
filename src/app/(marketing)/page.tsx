import Link from 'next/link'
import { Sparkles, Palette, Zap, Shield, TrendingUp, Rocket } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Hero Section - Neo-brutalism style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-300 via-pink-400 to-blue-500">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>

        <nav className="relative border-b-8 border-black bg-white">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-black border-4 border-black rotate-3 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-2xl font-black">ShopifyAI</span>
            </div>
            <div className="flex gap-4">
              <Link
                href="/auth/signin"
                className="px-6 py-2 font-bold border-4 border-black bg-white hover:translate-x-1 hover:translate-y-1 transition-transform"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="px-6 py-2 font-bold border-4 border-black bg-yellow-400 hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                Start Free
              </Link>
            </div>
          </div>
        </nav>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-black text-white font-bold border-4 border-black mb-6 rotate-[-2deg] shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
              🚀 AI-POWERED E-COMMERCE
            </div>

            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
              Build Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                Dream Store
              </span>
              <span className="block">In Minutes</span>
            </h1>

            <p className="text-2xl md:text-3xl font-bold mb-8 max-w-2xl">
              The only e-commerce platform with built-in AI that writes your content,
              generates images, and picks your perfect theme.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/auth/signup"
                className="px-8 py-4 text-xl font-black border-8 border-black bg-pink-500 text-white hover:translate-x-2 hover:translate-y-2 transition-transform shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
              >
                START FREE TRIAL →
              </Link>
              <Link
                href="#demo"
                className="px-8 py-4 text-xl font-black border-8 border-black bg-white hover:translate-x-2 hover:translate-y-2 transition-transform shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
              >
                WATCH DEMO
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-8 text-lg font-bold">
              <div className="flex items-center gap-2">
                ✅ No credit card required
              </div>
              <div className="flex items-center gap-2">
                ✅ 14-day free trial
              </div>
              <div className="flex items-center gap-2">
                ✅ Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              Why Choose ShopifyAI?
            </h2>
            <p className="text-2xl font-bold text-gray-700">
              Built for modern entrepreneurs who move fast
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'AI Content Generation',
                description: 'GPT-4 writes compelling product descriptions that convert. DALL-E creates stunning product images from text.',
                color: 'bg-yellow-400',
                rotate: 'rotate-[-2deg]'
              },
              {
                icon: Palette,
                title: '4 Beautiful Themes',
                description: 'Choose from Modern, Classic, Minimal, or Bold. Switch anytime. Customize colors, fonts, and layouts.',
                color: 'bg-pink-500',
                rotate: 'rotate-[2deg]'
              },
              {
                icon: Zap,
                title: 'Instant Setup',
                description: 'Go from zero to selling in under 10 minutes. No coding required. No designers needed.',
                color: 'bg-blue-500',
                rotate: 'rotate-[-1deg]'
              },
              {
                icon: Shield,
                title: 'Whitelabel Ready',
                description: 'Your brand, your domain, your store. Upload logo, set colors, connect custom domain.',
                color: 'bg-green-500',
                rotate: 'rotate-[1deg]'
              },
              {
                icon: TrendingUp,
                title: 'Built-in SEO',
                description: 'AI-optimized meta tags, clean URLs, fast loading. Rank higher on Google automatically.',
                color: 'bg-purple-500',
                rotate: 'rotate-[-2deg]'
              },
              {
                icon: Rocket,
                title: 'Stripe Payments',
                description: 'Accept payments instantly. Secure checkout. Track orders. Get paid.',
                color: 'bg-orange-500',
                rotate: 'rotate-[2deg]'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className={`p-8 border-8 border-black bg-white ${feature.rotate} hover:rotate-0 hover:scale-105 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`}
              >
                <div className={`w-16 h-16 ${feature.color} border-4 border-black flex items-center justify-center mb-4`}>
                  <feature.icon className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-black mb-3">{feature.title}</h3>
                <p className="text-lg font-bold text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white border-y-8 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              Simple, Honest Pricing
            </h2>
            <p className="text-2xl font-bold text-gray-700">
              No hidden fees. No surprises. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter */}
            <div className="p-8 border-8 border-black bg-gradient-to-br from-yellow-100 to-yellow-200 hover:translate-y-[-8px] transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-sm font-black mb-2">STARTER</div>
              <div className="text-5xl font-black mb-4">
                $29<span className="text-2xl">/mo</span>
              </div>
              <p className="font-bold mb-6">Perfect for getting started</p>

              <ul className="space-y-3 mb-8">
                {[
                  '50 Products',
                  '100 AI Generations/mo',
                  '2 Themes',
                  'Stripe Payments',
                  'Basic Support'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 font-bold">
                    <span className="text-green-600 text-xl">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/signup?plan=starter"
                className="block w-full text-center px-6 py-3 font-black border-4 border-black bg-white hover:translate-x-1 hover:translate-y-1 transition-transform"
              >
                START FREE TRIAL
              </Link>
            </div>

            {/* Pro - Featured */}
            <div className="p-8 border-8 border-black bg-gradient-to-br from-pink-400 to-purple-500 text-white hover:translate-y-[-8px] transition-transform shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative -top-4">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-yellow-400 text-black border-4 border-black font-black text-sm rotate-[-2deg]">
                MOST POPULAR
              </div>

              <div className="text-sm font-black mb-2">PRO</div>
              <div className="text-5xl font-black mb-4">
                $79<span className="text-2xl">/mo</span>
              </div>
              <p className="font-bold mb-6">For serious sellers</p>

              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited Products',
                  '500 AI Generations/mo',
                  'All 4 Themes',
                  'Custom Domain',
                  'Priority Support',
                  'Remove Branding'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 font-bold">
                    <span className="text-yellow-300 text-xl">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/signup?plan=pro"
                className="block w-full text-center px-6 py-3 font-black border-4 border-black bg-yellow-400 text-black hover:translate-x-1 hover:translate-y-1 transition-transform"
              >
                START FREE TRIAL
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-8 border-8 border-black bg-gradient-to-br from-blue-100 to-blue-200 hover:translate-y-[-8px] transition-transform shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-sm font-black mb-2">ENTERPRISE</div>
              <div className="text-5xl font-black mb-4">
                Custom
              </div>
              <p className="font-bold mb-6">For agencies & brands</p>

              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited Everything',
                  'Unlimited AI',
                  'White Label',
                  'Multi-store',
                  'Dedicated Support',
                  'Custom Features'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 font-bold">
                    <span className="text-blue-600 text-xl">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className="block w-full text-center px-6 py-3 font-black border-4 border-black bg-white hover:translate-x-1 hover:translate-y-1 transition-transform"
              >
                CONTACT SALES
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
            Ready to Launch Your Store?
          </h2>
          <p className="text-2xl font-bold mb-8 text-white">
            Join 1,000+ entrepreneurs building their dream businesses
          </p>

          <Link
            href="/auth/signup"
            className="inline-block px-12 py-6 text-2xl font-black border-8 border-black bg-white hover:translate-x-2 hover:translate-y-2 transition-transform shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]"
          >
            START YOUR FREE TRIAL →
          </Link>

          <p className="mt-6 font-bold text-white text-lg">
            No credit card required • 14 days free • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-8 border-black bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <span className="text-xl font-black">ShopifyAI</span>
              </div>
              <p className="font-bold text-gray-400">
                AI-powered e-commerce for modern entrepreneurs
              </p>
            </div>

            <div>
              <h4 className="font-black mb-4">Product</h4>
              <ul className="space-y-2 font-bold text-gray-400">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/themes">Themes</Link></li>
                <li><Link href="/demo">Demo</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-4">Company</h4>
              <ul className="space-y-2 font-bold text-gray-400">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/careers">Careers</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-4">Legal</h4>
              <ul className="space-y-2 font-bold text-gray-400">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/security">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t-4 border-gray-800 mt-8 pt-8 text-center font-bold text-gray-400">
            © 2024 ShopifyAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
