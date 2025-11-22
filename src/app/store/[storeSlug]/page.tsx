import { prisma } from '@/lib/prisma'
import { getTheme } from '@/lib/themes'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { notFound } from 'next/navigation'

export default async function StorefrontPage({
  params,
}: {
  params: { storeSlug: string }
}) {
  const store = await prisma.store.findFirst({
    where: {
      OR: [
        { customDomain: params.storeSlug },
        { user: { email: { contains: params.storeSlug } } },
      ],
    },
    include: {
      currentTheme: true,
      products: {
        where: { status: 'PUBLISHED' },
        include: {
          images: {
            take: 1,
            orderBy: { position: 'asc' },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!store) {
    notFound()
  }

  const theme = store.currentTheme
    ? getTheme(store.currentTheme.name)
    : getTheme('modern')

  return (
    <div
      style={{
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <header
        className="border-b"
        style={{
          borderColor: `${theme.colors.primary}20`,
          backgroundColor: theme.colors.secondary,
        }}
      >
        <div
          className="mx-auto px-6 py-4"
          style={{ maxWidth: theme.layout.maxWidth }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {store.logo && (
                <Image
                  src={store.logo}
                  alt={store.name}
                  width={40}
                  height={40}
                  className="rounded"
                />
              )}
              <h1
                className="text-2xl font-bold"
                style={{ color: theme.colors.primary }}
              >
                {store.name}
              </h1>
            </div>
            <nav className="flex gap-6">
              <Link
                href={`/store/${params.storeSlug}`}
                className="hover:opacity-70 transition-opacity"
              >
                Shop
              </Link>
              <Link
                href={`/store/${params.storeSlug}/about`}
                className="hover:opacity-70 transition-opacity"
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      {store.description && (
        <div
          className="py-12"
          style={{ backgroundColor: theme.colors.secondary }}
        >
          <div
            className="mx-auto px-6 text-center"
            style={{ maxWidth: theme.layout.maxWidth }}
          >
            <p className="text-lg max-w-2xl mx-auto">{store.description}</p>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <main className="py-12">
        <div
          className="mx-auto px-6"
          style={{ maxWidth: theme.layout.maxWidth }}
        >
          {store.products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">No products available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {store.products.map((product) => (
                <Link
                  key={product.id}
                  href={`/store/${params.storeSlug}/product/${product.slug}`}
                  className="group"
                >
                  <div
                    className="overflow-hidden transition-transform group-hover:scale-105"
                    style={{
                      borderRadius: theme.layout.borderRadius,
                      backgroundColor: theme.colors.secondary,
                    }}
                  >
                    <div className="aspect-square relative bg-gray-100">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.title}
                          fill
                          className="object-cover"
                          style={{
                            borderRadius:
                              theme.components.imageStyle === 'rounded'
                                ? theme.layout.borderRadius
                                : '0',
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold truncate">
                        {product.title}
                      </h3>
                      <p
                        className="text-lg font-bold mt-2"
                        style={{ color: theme.colors.primary }}
                      >
                        {formatPrice(Number(product.price))}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="border-t py-8"
        style={{
          borderColor: `${theme.colors.primary}20`,
          backgroundColor: theme.colors.secondary,
        }}
      >
        <div
          className="mx-auto px-6 text-center text-sm"
          style={{ maxWidth: theme.layout.maxWidth }}
        >
          <p>© {new Date().getFullYear()} {store.name}. All rights reserved.</p>
          {(store.email || store.phone) && (
            <div className="mt-2 flex justify-center gap-4">
              {store.email && (
                <a href={`mailto:${store.email}`} className="hover:opacity-70">
                  {store.email}
                </a>
              )}
              {store.phone && (
                <a href={`tel:${store.phone}`} className="hover:opacity-70">
                  {store.phone}
                </a>
              )}
            </div>
          )}
        </div>
      </footer>
    </div>
  )
}
