'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ThemeSelectorProps {
  theme: any
  storeId: string
  isActive: boolean
}

export default function ThemeSelector({
  theme,
  storeId,
  isActive,
}: ThemeSelectorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSelect = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/store/theme', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ themeId: theme.id }),
      })

      if (!response.ok) throw new Error('Failed to update theme')

      router.refresh()
    } catch (error) {
      console.error('Error updating theme:', error)
      alert('Failed to update theme')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={`overflow-hidden ${isActive ? 'ring-2 ring-primary' : ''}`}>
      <div
        className="h-48 p-6"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)`,
        }}
      >
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <div
            className="h-4 rounded mb-2"
            style={{ backgroundColor: theme.colors.primary, width: '60%' }}
          />
          <div
            className="h-3 rounded mb-1"
            style={{ backgroundColor: theme.colors.text, width: '80%', opacity: 0.5 }}
          />
          <div
            className="h-3 rounded"
            style={{ backgroundColor: theme.colors.text, width: '70%', opacity: 0.5 }}
          />
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold">{theme.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{theme.description}</p>
          </div>
          {isActive && (
            <div className="bg-green-100 text-green-800 p-2 rounded-full">
              <Check className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="flex gap-2 mb-4">
          {Object.values(theme.colors).slice(0, 5).map((color: any, i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2 border-gray-200"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <Button
          onClick={handleSelect}
          disabled={loading || isActive}
          className="w-full"
          variant={isActive ? 'outline' : 'default'}
        >
          {loading ? 'Applying...' : isActive ? 'Active Theme' : 'Use This Theme'}
        </Button>
      </div>
    </Card>
  )
}
