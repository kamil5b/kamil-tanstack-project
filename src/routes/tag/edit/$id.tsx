import { createFileRoute } from '@tanstack/react-router'
import TagFormTemplate from '@/client/pages/TagFormTemplate'
import { UpdateTagRequest } from '@/shared/requests/types/tag'
import { updateTag, getTagByID } from '@/server'

export const Route = createFileRoute('/tag/edit/$id')({
    component: RouteComponent,
    loader: async ({ params }) => 
      await getTagByID({ data: params.id }),
})

function RouteComponent() {
  const handleSave = async (req: UpdateTagRequest) => {
    try {
      return await updateTag({data: req})
    } catch (err) {
      console.error('Error saving tag', err)
      void alert('Failed to save tag')
    }
  }

  const initialData = Route.useLoaderData()

  // Map tag objects to string names for the form template
  const initialForForm = {
    ...initialData,
    tags: initialData.tags?.map((tag: { name: string }) => tag.name) ?? [],
  }

  return <TagFormTemplate initial={initialForForm} onEdit={handleSave} />
}
