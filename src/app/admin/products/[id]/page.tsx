'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageUpload } from '@/components/admin/image-upload'
import { AIContentAssistant } from '@/components/admin/ai-content-assistant'
import { Save, Trash2, Eye } from 'lucide-react'

export default function ProductEditPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    if (params.id !== 'new') {
      fetchProduct()
    } else {
      setLoading(false)
      setProduct({
        title: '',
        description: '',
        shortDescription: '',
        price: '',
        compareAtPrice: '',
        sku: '',
        inventoryQty: 0,
        status: 'DRAFT',
      })
    }
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`)
      if (!response.ok) throw new Error('Failed to fetch product')
      const data = await response.json()
      setProduct(data.product)
    } catch (error) {
      console.error('Error fetching product:', error)
      alert('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const url =
        params.id === 'new' ? '/api/products' : `/api/products/${params.id}`
      const method = params.id === 'new' ? 'POST' : 'PATCH'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })

      if (!response.ok) throw new Error('Failed to save product')

      const data = await response.json()
      if (params.id === 'new') {
        router.push(`/admin/products/${data.product.id}`)
      } else {
        alert('Product saved successfully!')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`/api/products/${params.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete product')

      router.push('/admin/products')
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product')
    }
  }

  const handleGenerateAI = async (prompt: string) => {
    const response = await fetch('/api/ai/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })

    if (!response.ok) throw new Error('Failed to generate image')

    const { imageUrl } = await response.json()
    return imageUrl
  }

  if (loading) {
    return <div className="p-6">Loading...</div>
  }

  if (!product) {
    return <div className="p-6">Product not found</div>
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {params.id === 'new' ? 'Create Product' : 'Edit Product'}
          </h1>
          <p className="text-gray-600 mt-1">
            Use AI to enhance your product content and images
          </p>
        </div>
        <div className="flex gap-2">
          {params.id !== 'new' && (
            <>
              <Button variant="outline" onClick={() => alert('Preview coming soon')}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </>
          )}
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={product.title}
                  onChange={(e) =>
                    setProduct({ ...product, title: e.target.value })
                  }
                  placeholder="Product title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description
                </label>
                <Textarea
                  value={product.description || ''}
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                  placeholder="Product description"
                  rows={6}
                />
                <div className="mt-3">
                  <AIContentAssistant
                    content={product.description || ''}
                    onImprove={(improved) =>
                      setProduct({ ...product, description: improved })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Short Description
                </label>
                <Textarea
                  value={product.shortDescription || ''}
                  onChange={(e) =>
                    setProduct({ ...product, shortDescription: e.target.value })
                  }
                  placeholder="Brief product summary"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                images={product.images?.map((img: any) => img.url) || []}
                onChange={async (urls) => {
                  // Add new images to the product
                  for (const url of urls) {
                    if (
                      !product.images?.some((img: any) => img.url === url) &&
                      params.id !== 'new'
                    ) {
                      await fetch(`/api/products/${params.id}/images`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ url }),
                      })
                    }
                  }
                  // Refresh product data
                  if (params.id !== 'new') {
                    fetchProduct()
                  } else {
                    setProduct({
                      ...product,
                      images: urls.map((url, i) => ({ url, position: i })),
                    })
                  }
                }}
                onGenerateAI={handleGenerateAI}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <Input
                  type="number"
                  step="0.01"
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Compare at Price
                </label>
                <Input
                  type="number"
                  step="0.01"
                  value={product.compareAtPrice || ''}
                  onChange={(e) =>
                    setProduct({ ...product, compareAtPrice: e.target.value })
                  }
                  placeholder="0.00"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">SKU</label>
                <Input
                  value={product.sku || ''}
                  onChange={(e) =>
                    setProduct({ ...product, sku: e.target.value })
                  }
                  placeholder="SKU-123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <Input
                  type="number"
                  value={product.inventoryQty}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      inventoryQty: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <select
                value={product.status}
                onChange={(e) =>
                  setProduct({ ...product, status: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
