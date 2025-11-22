import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getAllThemes } from '@/lib/themes'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'
import ThemeSelector from './theme-selector'

export default async function ThemesPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return null
  }

  let store = await prisma.store.findUnique({
    where: { userId: session.user.id },
    include: { currentTheme: true },
  })

  if (!store) {
    store = await prisma.store.create({
      data: {
        userId: session.user.id,
        name: 'My Store',
      },
      include: { currentTheme: true },
    })
  }

  const themes = getAllThemes()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Themes</h1>
        <p className="text-gray-600 mt-1">
          Choose a theme for your storefront. You can switch anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {themes.map((theme) => (
          <ThemeSelector
            key={theme.id}
            theme={theme}
            storeId={store!.id}
            isActive={store!.currentThemeId === theme.id}
          />
        ))}
      </div>

      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">
          Custom Themes (Coming Soon)
        </h3>
        <p className="text-sm text-blue-800">
          Want to create your own custom theme? This feature is coming soon.
          You'll be able to customize colors, fonts, layouts, and more.
        </p>
      </Card>
    </div>
  )
}
