import { prisma } from '@/lib/prisma'
import { getTheme } from '@/lib/themes'
import { formatPrice } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import CheckoutButton from './checkout-button'

export default async function ProductPage({
  params,
}: {
  params: { storeSlug: string; slug: string }
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
    },
  })

  if (!store) {
    notFound()
  }

  const product = await prisma.product.findFirst({
    where: {
      slug: params.slug,
      storeId: store.id,
      status: 'PUBLISHED',
    },
    include: {
      images: {
        orderBy: { position: 'asc' },
      },
      videos: true,
      attributes: true,
      variants: true,
    },
  })

  if (!product) {
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
          <Link
            href={`/store/${params.storeSlug}`}
            className="hover:opacity-70 transition-opacity"
            style={{ color: theme.colors.primary }}
          >
            ← Back to {store.name}
          </Link>
        </div>
      </header>

      {/* Product Details */}
      <main className="py-12">
        <div
          className="mx-auto px-6"
          style={{ maxWidth: theme.layout.maxWidth }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              {product.images.length > 0 ? (
                <>
                  <div
                    className="aspect-square relative overflow-hidden"
                    style={{
                      borderRadius: theme.layout.borderRadius,
                      backgroundColor: theme.colors.secondary,
                    }}
                  >
                    <Image
                      src={product.images[0].url}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {product.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                      {product.images.slice(1).map((image, index) => (
                        <div
                          key={image.id}
                          className="aspect-square relative overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                          style={{
                            borderRadius: theme.layout.borderRadius,
                            backgroundColor: theme.colors.secondary,
                          }}
                        >
                          <Image
                            src={image.url}
                            alt={`${product.title} ${index + 2}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div
                  className="aspect-square flex items-center justify-center"
                  style={{
                    borderRadius: theme.layout.borderRadius,
                    backgroundColor: theme.colors.secondary,
                  }}
                >
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1
                  className="text-4xl font-bold mb-2"
                  style={{ color: theme.colors.primary }}
                >
                  {product.title}
                </h1>
                {product.shortDescription && (
                  <p className="text-lg text-gray-600">
                    {product.shortDescription}
                  </p>
                )}
              </div>

              <div className="flex items-baseline gap-4">
                <span
                  className="text-3xl font-bold"
                  style={{ color: theme.colors.primary }}
                >
                  {formatPrice(Number(product.price))}
                </span>
                {product.compareAtPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(Number(product.compareAtPrice))}
                  </span>
                )}
              </div>

              {product.description && (
                <div className="prose prose-lg">
                  <p>{product.description}</p>
                </div>
              )}

              {product.attributes.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Product Details</h3>
                  <dl className="space-y-2">
                    {product.attributes.map((attr) => (
                      <div key={attr.id} className="flex gap-3">
                        <dt className="font-medium">{attr.name}:</dt>
                        <dd className="text-gray-600">{attr.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {product.inventoryQty > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    {product.inventoryQty} in stock
                  </p>
                  <CheckoutButton
                    product={{
                      id: product.id,
                      title: product.title,
                      price: Number(product.price),
                      image: product.images[0]?.url,
                    }}
                    storeId={store.id}
                    theme={theme}
                  />
                </div>
              ) : (
                <div
                  className="py-3 px-6 text-center rounded-lg"
                  style={{
                    backgroundColor: theme.colors.secondary,
                    borderRadius: theme.layout.borderRadius,
                  }}
                >
                  <p className="font-semibold">Out of Stock</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
