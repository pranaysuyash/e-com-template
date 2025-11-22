import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import SettingsForm from './settings-form'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return null
  }

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

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Store Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your store branding, domain, and integrations
        </p>
      </div>

      <SettingsForm store={store} />
    </div>
  )
}
