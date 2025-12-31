import { initInjection } from '@/server'
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/tag/$id')({
  server: {
    handlers: {
      DELETE: async ({ params }: { params: { id: string } }) => {
        const svc = initInjection();
        // params.id is automatically available from the filename $id
        await svc.tagSvc.deleteTag(params.id);
        return json({message: "Tag deleted successfully"}, { status: 200 });
      }
    },
  },
})