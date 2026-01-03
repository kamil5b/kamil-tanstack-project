import { createFileRoute } from '@tanstack/react-router'
import ProductFormTemplate from '@/client/pages/ProductFormTemplate'
import { CreateProductRequest } from '@/shared/requests/types/product'
import { createProduct } from '@/server'

export const Route = createFileRoute('/product/new')({
  component: RouteComponent,
})

function RouteComponent() {
  const handleSave = async (req: CreateProductRequest) => {
    try {
      return await createProduct({data: req})
    } catch (err) {
      console.error('Error saving product', err)
      void alert('Failed to save product')
    }
  }

  return <ProductFormTemplate onSave={handleSave} />
}
