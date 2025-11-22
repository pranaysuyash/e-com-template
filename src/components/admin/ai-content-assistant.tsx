'use client'

import { useState } from 'react'
import { Sparkles, Loader2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AIContentAssistantProps {
  content: string
  onImprove: (improved: string) => void
}

export function AIContentAssistant({
  content,
  onImprove,
}: AIContentAssistantProps) {
  const [improving, setImproving] = useState(false)
  const [improved, setImproved] = useState<string | null>(null)

  const handleImprove = async () => {
    if (!content.trim()) {
      alert('Please enter some content first')
      return
    }

    setImproving(true)
    setImproved(null)

    try {
      const response = await fetch('/api/ai/improve-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })

      if (!response.ok) throw new Error('Failed to improve content')

      const { improved: improvedContent } = await response.json()
      setImproved(improvedContent)
    } catch (error) {
      console.error('Error improving content:', error)
      alert('Failed to improve content')
    } finally {
      setImproving(false)
    }
  }

  const handleAccept = () => {
    if (improved) {
      onImprove(improved)
      setImproved(null)
    }
  }

  return (
    <div className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-blue-50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium">AI Content Assistant</span>
        </div>
        <Button
          onClick={handleImprove}
          disabled={improving || !content.trim()}
          size="sm"
          variant="outline"
        >
          {improving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Improving...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Improve with AI
            </>
          )}
        </Button>
      </div>

      {improved && (
        <div className="mt-4 space-y-3">
          <div className="bg-white rounded-md p-3 border border-purple-200">
            <p className="text-xs text-gray-500 mb-1">AI Improved Version:</p>
            <p className="text-sm">{improved}</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAccept} size="sm" className="flex-1">
              <Check className="w-4 h-4 mr-2" />
              Accept & Replace
            </Button>
            <Button
              onClick={() => setImproved(null)}
              size="sm"
              variant="outline"
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
