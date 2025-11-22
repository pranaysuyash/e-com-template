import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return null
  }

  const [products, publishedProducts, orders] = await Promise.all([
    prisma.product.count({
      where: { userId: session.user.id },
    }),
    prisma.product.count({
      where: { userId: session.user.id, status: 'PUBLISHED' },
    }),
    prisma.order.count({
      where: {
        store: {
          userId: session.user.id,
        },
      },
    }),
  ])

  const stats = [
    {
      title: 'Total Products',
      value: products,
      icon: Package,
      description: `${publishedProducts} published`,
    },
    {
      title: 'Total Orders',
      value: orders,
      icon: ShoppingCart,
      description: 'All time',
    },
    {
      title: 'Revenue',
      value: '$0',
      icon: DollarSign,
      description: 'Connect Stripe to track',
    },
    {
      title: 'Growth',
      value: '+0%',
      icon: TrendingUp,
      description: 'vs last month',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {session.user.name || session.user.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/admin/products/new"
              className="p-6 border rounded-lg hover:border-primary transition-colors text-center"
            >
              <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Add Product</h3>
              <p className="text-sm text-gray-600 mt-1">
                Create a new product with AI
              </p>
            </a>
            <a
              href="/admin/themes"
              className="p-6 border rounded-lg hover:border-primary transition-colors text-center"
            >
              <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Choose Theme</h3>
              <p className="text-sm text-gray-600 mt-1">
                Customize your storefront
              </p>
            </a>
            <a
              href="/admin/settings"
              className="p-6 border rounded-lg hover:border-primary transition-colors text-center"
            >
              <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Store Settings</h3>
              <p className="text-sm text-gray-600 mt-1">
                Configure branding & domain
              </p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
