import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { improveProductDescription } from '@/lib/ai/openai'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { content } = await req.json()

    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 })
    }

    const improved = await improveProductDescription(content)

    // Log AI usage
    await prisma.aIGenerationHistory.create({
      data: {
        userId: session.user.id,
        type: 'CONTENT_IMPROVEMENT',
        prompt: content,
        result: improved,
      },
    })

    return NextResponse.json({ improved }, { status: 200 })
  } catch (error) {
    console.error('AI improvement error:', error)
    return NextResponse.json(
      { error: 'Failed to improve content' },
      { status: 500 }
    )
  }
}
