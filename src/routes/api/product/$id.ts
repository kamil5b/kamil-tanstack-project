import { initInjection } from '@/server'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/product/$id')({
  server: {
    handlers: {
      DELETE: async ({ params }: { params: { id: string } }) => {
        const svc = initInjection();
        // params.id is automatically available from the filename $id
        const deleted = await svc.productSvc.deleteProduct(params.id);
        return json(deleted);
      }
    },
  },
})