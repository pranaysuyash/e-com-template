'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Register user
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }

      // Auto sign in after registration
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.ok) {
        router.push('/admin/dashboard')
      } else {
        throw new Error('Sign in failed')
      }
    } catch (error: any) {
      alert(error.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-400 to-blue-500 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 bg-black border-4 border-black rotate-3 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <span className="text-4xl font-black">ShopifyAI</span>
        </Link>

        {/* Form Card */}
        <div className="p-8 bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rotate-[-1deg] hover:rotate-0 transition-transform">
          <h1 className="text-3xl font-black mb-2">Create Account</h1>
          <p className="font-bold text-gray-600 mb-6">
            Start your 14-day free trial. No credit card required.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-bold mb-2">Full Name</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
                className="border-4 border-black font-bold"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Email</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                required
                className="border-4 border-black font-bold"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Password</label>
              <Input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
                minLength={8}
                className="border-4 border-black font-bold"
              />
              <p className="text-sm font-bold text-gray-600 mt-1">
                Minimum 8 characters
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 text-lg font-black border-4 border-black bg-yellow-400 hover:bg-yellow-500 hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              {loading ? 'Creating Account...' : 'START FREE TRIAL →'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-bold text-gray-600">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-black underline font-black">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t-4 border-black">
            <div className="flex items-start gap-2 text-sm font-bold text-gray-600">
              <span>✅</span>
              <span>By signing up, you agree to our Terms of Service and Privacy Policy</span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 text-center space-y-2 font-bold">
          <p>✅ 14-day free trial</p>
          <p>✅ No credit card required</p>
          <p>✅ Cancel anytime</p>
        </div>
      </div>
    </div>
  )
}
