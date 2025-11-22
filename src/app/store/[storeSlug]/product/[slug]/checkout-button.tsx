'use client'

import { useState } from 'react'
import { ShoppingCart, Loader2 } from 'lucide-react'

interface CheckoutButtonProps {
  product: {
    id: string
    title: string
    price: number
    image?: string
  }
  storeId: string
  theme: any
}

export default function CheckoutButton({
  product,
  storeId,
  theme,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId,
          items: [
            {
              productId: product.id,
              quantity,
            },
          ],
        }),
      })

      if (!response.ok) throw new Error('Checkout failed')

      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to initiate checkout. Please ensure Stripe is configured.')
    } finally {
      setLoading(false)
    }
  }

  const buttonStyle = {
    backgroundColor: theme.colors.primary,
    color: theme.colors.secondary,
    borderRadius:
      theme.components.buttonStyle === 'pill'
        ? '9999px'
        : theme.components.buttonStyle === 'square'
        ? '0'
        : theme.layout.borderRadius,
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="font-medium">Quantity:</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 flex items-center justify-center border rounded"
            style={{ borderColor: theme.colors.primary }}
          >
            -
          </button>
          <span className="w-12 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 flex items-center justify-center border rounded"
            style={{ borderColor: theme.colors.primary }}
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full py-4 px-6 font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
        style={buttonStyle}
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            Buy Now
          </>
        )}
      </button>
    </div>
  )
}
