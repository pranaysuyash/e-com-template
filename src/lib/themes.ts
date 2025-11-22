import { ThemeConfig } from '@/types'

export const THEMES: Record<string, ThemeConfig & { id: string; name: string; description: string }> = {
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'Clean, minimalist design with bold typography',
    colors: {
      primary: '#000000',
      secondary: '#ffffff',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#1f2937',
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
    },
    layout: {
      maxWidth: '1280px',
      spacing: 'comfortable',
      borderRadius: '0.5rem',
    },
    components: {
      buttonStyle: 'rounded',
      cardStyle: 'elevated',
      imageStyle: 'rounded',
    },
  },
  classic: {
    id: 'classic',
    name: 'Classic',
    description: 'Timeless design with elegant serif fonts',
    colors: {
      primary: '#1e293b',
      secondary: '#f8fafc',
      accent: '#d97706',
      background: '#ffffff',
      text: '#334155',
    },
    typography: {
      headingFont: 'Georgia',
      bodyFont: 'system-ui',
    },
    layout: {
      maxWidth: '1200px',
      spacing: 'relaxed',
      borderRadius: '0.25rem',
    },
    components: {
      buttonStyle: 'square',
      cardStyle: 'outlined',
      imageStyle: 'square',
    },
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Ultra-clean design with maximum white space',
    colors: {
      primary: '#171717',
      secondary: '#fafafa',
      accent: '#737373',
      background: '#ffffff',
      text: '#404040',
    },
    typography: {
      headingFont: 'Helvetica',
      bodyFont: 'Helvetica',
    },
    layout: {
      maxWidth: '1024px',
      spacing: 'generous',
      borderRadius: '0',
    },
    components: {
      buttonStyle: 'square',
      cardStyle: 'filled',
      imageStyle: 'square',
    },
  },
  bold: {
    id: 'bold',
    name: 'Bold',
    description: 'Vibrant colors and strong visual hierarchy',
    colors: {
      primary: '#dc2626',
      secondary: '#fef2f2',
      accent: '#fb923c',
      background: '#fffbeb',
      text: '#292524',
    },
    typography: {
      headingFont: 'Impact',
      bodyFont: 'Inter',
    },
    layout: {
      maxWidth: '1400px',
      spacing: 'compact',
      borderRadius: '1rem',
    },
    components: {
      buttonStyle: 'pill',
      cardStyle: 'elevated',
      imageStyle: 'rounded',
    },
  },
}

export function getTheme(themeId: string): ThemeConfig {
  return THEMES[themeId] || THEMES.modern
}

export function getAllThemes() {
  return Object.values(THEMES)
}
