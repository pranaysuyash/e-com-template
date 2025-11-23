import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateSlug } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { storeName, storeDescription, theme, productTitle } = await req.json()

    // Update store
    let store = await prisma.store.findUnique({
      where: { userId: session.user.id },
    })

    if (!store) {
      store = await prisma.store.create({
        data: {
          userId: session.user.id,
          name: storeName || 'My Store',
          description: storeDescription,
        },
      })
    } else {
      store = await prisma.store.update({
        where: { id: store.id },
        data: {
          name: storeName,
          description: storeDescription,
        },
      })
    }

    // Set theme
    if (theme) {
      let themeRecord = await prisma.theme.findUnique({
        where: { name: theme },
      })

      if (!themeRecord) {
        themeRecord = await prisma.theme.create({
          data: {
            name: theme,
            displayName: theme.charAt(0).toUpperCase() + theme.slice(1),
            config: {},
          },
        })
      }

      await prisma.store.update({
        where: { id: store.id },
        data: { currentThemeId: themeRecord.id },
      })
    }

    // Create first product
    if (productTitle) {
      await prisma.product.create({
        data: {
          storeId: store.id,
          userId: session.user.id,
          title: productTitle,
          slug: generateSlug(productTitle),
          price: 0,
          status: 'DRAFT',
          description: 'Add a description for your product',
        },
      })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Onboarding failed' },
      { status: 500 }
    )
  }
}
