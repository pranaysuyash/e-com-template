'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.ok) {
        const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard'
        router.push(callbackUrl)
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error: any) {
      alert(error.message || 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8">
          <div className="w-16 h-16 bg-black border-4 border-black rotate-3 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <span className="text-4xl font-black text-white">ShopifyAI</span>
        </Link>

        {/* Form Card */}
        <div className="p-8 bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] rotate-[1deg] hover:rotate-0 transition-transform">
          <h1 className="text-3xl font-black mb-2">Welcome Back!</h1>
          <p className="font-bold text-gray-600 mb-6">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="border-4 border-black font-bold"
              />
              <div className="text-right mt-2">
                <Link href="/auth/forgot-password" className="text-sm font-bold underline">
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 text-lg font-black border-4 border-black bg-pink-500 text-white hover:bg-pink-600 hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              {loading ? 'Signing In...' : 'SIGN IN →'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-bold text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-black underline font-black">
                Start free trial
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
