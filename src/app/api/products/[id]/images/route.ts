import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { url, altText, isAiGenerated, aiPrompt } = await req.json()

    // Get the current max position
    const lastImage = await prisma.productImage.findFirst({
      where: { productId: params.id },
      orderBy: { position: 'desc' },
    })

    const position = lastImage ? lastImage.position + 1 : 0

    const image = await prisma.productImage.create({
      data: {
        productId: params.id,
        url,
        altText,
        position,
        isAiGenerated: isAiGenerated || false,
        aiPrompt,
      },
    })

    return NextResponse.json({ image }, { status: 201 })
  } catch (error) {
    console.error('Error adding product image:', error)
    return NextResponse.json(
      { error: 'Failed to add image' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { imageId } = await req.json()

    await prisma.productImage.delete({
      where: { id: imageId },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error deleting product image:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
