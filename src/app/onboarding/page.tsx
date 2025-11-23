'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles, Palette, Store, Rocket } from 'lucide-react'

const steps = [
  {
    id: 'store',
    title: 'Name Your Store',
    icon: Store,
    description: 'Choose a memorable name for your e-commerce store',
  },
  {
    id: 'theme',
    title: 'Pick Your Vibe',
    icon: Palette,
    description: 'Select a theme that matches your brand',
  },
  {
    id: 'products',
    title: 'Add Your First Product',
    icon: Sparkles,
    description: 'Get started with AI-powered product creation',
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState({
    storeName: '',
    storeDescription: '',
    theme: 'modern',
    productTitle: '',
  })

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
      // Complete onboarding
      try {
        await fetch('/api/onboarding/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        router.push('/admin/dashboard?welcome=true')
      } catch (error) {
        console.error('Onboarding error:', error)
      }
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleSkip = () => {
    router.push('/admin/dashboard')
  }

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-400 to-blue-500 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, i) => (
              <div
                key={step.id}
                className={`flex-1 h-3 border-4 border-black ${
                  i <= currentStep ? 'bg-yellow-400' : 'bg-white'
                } ${i > 0 ? 'ml-2' : ''}`}
              />
            ))}
          </div>
          <div className="flex justify-between font-black text-sm">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <button onClick={handleSkip} className="underline">
              Skip →
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="p-10 bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-yellow-400 border-4 border-black flex items-center justify-center rotate-[-3deg]">
              <Icon className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-black">{currentStepData.title}</h1>
              <p className="font-bold text-gray-600">{currentStepData.description}</p>
            </div>
          </div>

          {/* Step Content */}
          <div className="space-y-6">
            {currentStep === 0 && (
              <>
                <div>
                  <label className="block font-bold mb-2">Store Name *</label>
                  <Input
                    value={data.storeName}
                    onChange={(e) => setData({ ...data, storeName: e.target.value })}
                    placeholder="My Awesome Store"
                    className="border-4 border-black font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-2">Store Description</label>
                  <Input
                    value={data.storeDescription}
                    onChange={(e) => setData({ ...data, storeDescription: e.target.value })}
                    placeholder="Selling amazing products since 2024"
                    className="border-4 border-black font-bold"
                  />
                </div>
              </>
            )}

            {currentStep === 1 && (
              <div className="grid grid-cols-2 gap-4">
                {['modern', 'classic', 'minimal', 'bold'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setData({ ...data, theme })}
                    className={`p-6 border-8 border-black ${
                      data.theme === theme ? 'bg-yellow-400' : 'bg-white'
                    } hover:translate-x-1 hover:translate-y-1 transition-transform`}
                  >
                    <div className="text-2xl font-black capitalize mb-2">{theme}</div>
                    <div className="text-sm font-bold text-gray-600">
                      {theme === 'modern' && 'Clean & minimalist'}
                      {theme === 'classic' && 'Timeless elegance'}
                      {theme === 'minimal' && 'Ultra simple'}
                      {theme === 'bold' && 'Vibrant & energetic'}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <>
                <div>
                  <label className="block font-bold mb-2">Product Name *</label>
                  <Input
                    value={data.productTitle}
                    onChange={(e) => setData({ ...data, productTitle: e.target.value })}
                    placeholder="Premium Wireless Headphones"
                    className="border-4 border-black font-bold text-lg"
                  />
                </div>
                <div className="p-4 bg-blue-50 border-4 border-black">
                  <p className="font-bold text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    AI will generate descriptions and images after setup!
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8">
            {currentStep > 0 && (
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="outline"
                className="border-4 border-black font-black"
              >
                ← Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 0 && !data.storeName) ||
                (currentStep === 2 && !data.productTitle)
              }
              className="flex-1 py-6 text-lg font-black border-4 border-black bg-yellow-400 hover:bg-yellow-500 hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <Rocket className="w-5 h-5 mr-2" />
                  Launch My Store →
                </>
              ) : (
                'Continue →'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
