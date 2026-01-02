import { createFileRoute } from '@tanstack/react-router'
import ProductFormTemplate from '@/client/pages/ProductFormTemplate'

export const Route = createFileRoute('/product/new')({
  component: RouteComponent,
})

function RouteComponent() {
  const handleSave = async (data: any) => {
    try {
      const res = await fetch(`${process.env.PUBLIC_URL || 'http://localhost:3000'}/api/product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to save product')
      window.location.assign('/product')
    } catch (err) {
      console.error('Error saving product', err)
      void alert('Failed to save product')
    }
  }

  return <ProductFormTemplate onSave={handleSave} />
}
