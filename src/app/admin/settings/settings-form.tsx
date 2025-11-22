'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SettingsForm({ store }: { store: any }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [data, setData] = useState({
    name: store.name || '',
    description: store.description || '',
    logo: store.logo || '',
    primaryColor: store.primaryColor || '#000000',
    secondaryColor: store.secondaryColor || '#ffffff',
    accentColor: store.accentColor || '#3b82f6',
    customDomain: store.customDomain || '',
    email: store.email || '',
    phone: store.phone || '',
    address: store.address || '',
  })

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/store/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to save settings')

      alert('Settings saved successfully!')
      router.refresh()
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Store Name</label>
            <Input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="My Awesome Store"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
              placeholder="Tell customers about your store"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Logo URL</label>
            <Input
              value={data.logo}
              onChange={(e) => setData({ ...data, logo: e.target.value })}
              placeholder="https://example.com/logo.png"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Branding Colors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Primary Color</label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={data.primaryColor}
                  onChange={(e) =>
                    setData({ ...data, primaryColor: e.target.value })
                  }
                  className="w-16 h-10"
                />
                <Input
                  value={data.primaryColor}
                  onChange={(e) =>
                    setData({ ...data, primaryColor: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Secondary Color
              </label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={data.secondaryColor}
                  onChange={(e) =>
                    setData({ ...data, secondaryColor: e.target.value })
                  }
                  className="w-16 h-10"
                />
                <Input
                  value={data.secondaryColor}
                  onChange={(e) =>
                    setData({ ...data, secondaryColor: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Accent Color</label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={data.accentColor}
                  onChange={(e) =>
                    setData({ ...data, accentColor: e.target.value })
                  }
                  className="w-16 h-10"
                />
                <Input
                  value={data.accentColor}
                  onChange={(e) =>
                    setData({ ...data, accentColor: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Custom Domain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Domain Name</label>
            <Input
              value={data.customDomain}
              onChange={(e) => setData({ ...data, customDomain: e.target.value })}
              placeholder="shop.yourdomain.com"
            />
            <p className="text-sm text-gray-500 mt-1">
              Configure your custom domain to point to this store
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="contact@store.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input
                type="tel"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <Textarea
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              placeholder="123 Main St, City, State, ZIP"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>
    </div>
  )
}
