import FormTemplate from '@/client/templates/FormTemplate'
import { Tag } from '@/shared/entities/types/tag'
import { CreateTagRequestSchema, UpdateTagRequestSchema } from '@/shared/requests/schemas/tag'
import { UpdateTagRequest, type CreateTagRequest } from '@/shared/requests/types/tag'
import { id } from 'zod/v4/locales'

export default function TagFormTemplate(props: {
	initial?: Partial<Tag>
	onSave?: (data: CreateTagRequest) => void
	onEdit?: (data: UpdateTagRequest) => void
}) {
	const { initial = {}, onSave, onEdit } = props

	return (
		<FormTemplate
			title={initial?.name ? 'Edit Tag' : 'Create Tag'}
			schema={onEdit ? UpdateTagRequestSchema : CreateTagRequestSchema}
			initialValues={{
				id: initial.id,
				name: initial.name ?? '',
				color: initial.color ?? ''
			}}
			onSubmit={(values) => {
				// With schema-driven form the values are already structured according to CreateTagRequestSchema
				console.log('save tag', values)
				if (values.id) {
					onEdit?.(values as UpdateTagRequest)
				} else {
					onSave?.(values as CreateTagRequest)
				}
				console.log('save tag', values)
				window.location.href = '/tag'; // Redirect to tags list after save
			}}
		/>
	)
}
