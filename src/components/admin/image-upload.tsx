'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Loader2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface ImageUploadProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
  onGenerateAI?: (prompt: string) => Promise<string>
}

export function ImageUpload({
  images,
  onChange,
  maxImages = 10,
  onGenerateAI,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [generatingAI, setGeneratingAI] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true)

      try {
        const formData = new FormData()
        acceptedFiles.forEach((file) => {
          formData.append('files', file)
        })

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) throw new Error('Upload failed')

        const { urls } = await response.json()
        onChange([...images, ...urls].slice(0, maxImages))
      } catch (error) {
        console.error('Upload error:', error)
        alert('Failed to upload images')
      } finally {
        setUploading(false)
      }
    },
    [images, onChange, maxImages]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxFiles: maxImages - images.length,
    disabled: uploading || images.length >= maxImages,
  })

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim() || !onGenerateAI) return

    setGeneratingAI(true)
    try {
      const url = await onGenerateAI(aiPrompt)
      onChange([...images, url])
      setAiPrompt('')
    } catch (error) {
      console.error('AI generation error:', error)
      alert('Failed to generate image')
    } finally {
      setGeneratingAI(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group aspect-square">
              <Image
                src={url}
                alt={`Product ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary'
          } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin" />
          ) : (
            <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          )}
          <p className="text-sm text-gray-600">
            {isDragActive
              ? 'Drop images here...'
              : 'Drag & drop images, or click to select'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {images.length}/{maxImages} images
          </p>
        </div>
      )}

      {/* AI Generation */}
      {onGenerateAI && (
        <div className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium">AI Image Generation</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              className="flex-1 px-3 py-2 border rounded-md text-sm"
              disabled={generatingAI}
            />
            <Button
              onClick={handleGenerateAI}
              disabled={!aiPrompt.trim() || generatingAI}
              size="sm"
            >
              {generatingAI ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate'
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
