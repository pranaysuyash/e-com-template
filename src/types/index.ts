import { Prisma } from '@prisma/client'

// Product with all relations
export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    images: true
    videos: true
    models3D: true
    category: true
    tags: true
    attributes: true
    variants: true
    store: true
  }
}>

// Store with relations
export type StoreWithTheme = Prisma.StoreGetPayload<{
  include: {
    currentTheme: true
  }
}>

// Theme configuration types
export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
  }
  typography: {
    headingFont: string
    bodyFont: string
  }
  layout: {
    maxWidth: string
    spacing: string
    borderRadius: string
  }
  components: {
    buttonStyle: 'rounded' | 'square' | 'pill'
    cardStyle: 'elevated' | 'outlined' | 'filled'
    imageStyle: 'rounded' | 'square' | 'circle'
  }
}

// AI Service Types
export interface AIContentImprovement {
  original: string
  improved: string
  suggestions: string[]
}

export interface AIImageGeneration {
  prompt: string
  imageUrl: string
  thumbnailUrl?: string
}

export interface AIVariantGeneration {
  originalImageUrl: string
  variants: AIImageGeneration[]
}

// Upload types
export interface UploadResult {
  url: string
  fileName: string
  fileSize: number
  mimeType: string
}
