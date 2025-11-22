import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()

    let store = await prisma.store.findUnique({
      where: { userId: session.user.id },
    })

    if (!store) {
      store = await prisma.store.create({
        data: {
          userId: session.user.id,
          name: data.name || 'My Store',
        },
      })
    }

    const updated = await prisma.store.update({
      where: { id: store.id },
      data: {
        name: data.name,
        description: data.description,
        logo: data.logo,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        accentColor: data.accentColor,
        customDomain: data.customDomain,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
    })

    return NextResponse.json({ store: updated }, { status: 200 })
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}
