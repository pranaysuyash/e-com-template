import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { THEMES } from '@/lib/themes'

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { themeId } = await req.json()

    if (!THEMES[themeId]) {
      return NextResponse.json({ error: 'Invalid theme' }, { status: 400 })
    }

    // Get or create store
    let store = await prisma.store.findUnique({
      where: { userId: session.user.id },
    })

    if (!store) {
      store = await prisma.store.create({
        data: {
          userId: session.user.id,
          name: 'My Store',
        },
      })
    }

    // Check if theme exists in database
    let theme = await prisma.theme.findUnique({
      where: { name: themeId },
    })

    if (!theme) {
      // Create theme in database
      const themeConfig = THEMES[themeId]
      theme = await prisma.theme.create({
        data: {
          name: themeId,
          displayName: themeConfig.name,
          description: themeConfig.description,
          config: themeConfig as any,
          layoutType: 'GRID',
        },
      })
    }

    // Update store theme
    await prisma.store.update({
      where: { id: store.id },
      data: { currentThemeId: theme.id },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error updating theme:', error)
    return NextResponse.json(
      { error: 'Failed to update theme' },
      { status: 500 }
    )
  }
}
