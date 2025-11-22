import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function uploadFile(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // For local storage (development)
  if (process.env.UPLOAD_STORAGE === 'local' || !process.env.UPLOAD_STORAGE) {
    const uploadDir = join(process.cwd(), 'public', 'uploads')

    // Create uploads directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Generate unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`
    const filepath = join(uploadDir, filename)

    await writeFile(filepath, buffer)

    return `/uploads/${filename}`
  }

  // For S3 or other cloud storage
  // Implement S3 upload logic here if needed
  throw new Error('Cloud storage not implemented yet. Use local storage.')
}

export async function uploadFiles(files: File[]): Promise<string[]> {
  const urls = await Promise.all(files.map(uploadFile))
  return urls
}

export function getFileUrl(path: string): string {
  if (path.startsWith('http')) {
    return path
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  return `${baseUrl}${path}`
}
