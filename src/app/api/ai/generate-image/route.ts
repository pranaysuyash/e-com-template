import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateProductImage } from '@/lib/ai/openai'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const imageUrl = await generateProductImage(prompt)

    // Log AI usage
    await prisma.aIGenerationHistory.create({
      data: {
        userId: session.user.id,
        type: 'IMAGE_GENERATION',
        prompt,
        result: imageUrl,
      },
    })

    return NextResponse.json({ imageUrl }, { status: 200 })
  } catch (error) {
    console.error('AI image generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}
