import { createFileRoute } from '@tanstack/react-router'
import ProductFormTemplate from '@/client/pages/ProductFormTemplate'
import { UpdateProductRequest } from '@/shared/requests/types/product'
import { updateProduct, getProductByID } from '@/server'

export const Route = createFileRoute('/product/edit/$id')({
    component: RouteComponent,
    loader: async ({ params }) => 
      await getProductByID({ data: params.id }),
})

function RouteComponent() {
  const handleSave = async (req: UpdateProductRequest) => {
    try {
      return await updateProduct({data: req})
    } catch (err) {
      console.error('Error saving product', err)
      void alert('Failed to save product')
    }
  }

  return <ProductFormTemplate onSave={handleSave} />
}
