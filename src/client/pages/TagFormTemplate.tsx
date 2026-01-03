import FormTemplate from '@/client/templates/FormTemplate'
import { Tag } from '@/shared/entities/types/tag'
import { CreateTagRequestSchema } from '@/shared/requests/schemas/tag'
import { UpdateTagRequest, type CreateTagRequest } from '@/shared/requests/types/tag'

export default function TagFormTemplate(props: {
	initial?: Partial<Tag>
	onSave?: (data: CreateTagRequest) => void
	onEdit?: (data: UpdateTagRequest) => void
}) {
	const { initial = {}, onSave, onEdit } = props

	return (
		<FormTemplate
			title={initial?.name ? 'Edit Tag' : 'Create Tag'}
			schema={CreateTagRequestSchema}
			initialValues={{
				name: initial.name ?? '',
				color: initial.color ?? ''
			}}
			onSubmit={(values) => {
				// With schema-driven form the values are already structured according to CreateTagRequestSchema
				if (values.id) {
					onEdit?.(values as UpdateTagRequest)
				} else {
					onSave?.(values as CreateTagRequest)
				}
				console.log('save tag', values)
			}}
		/>
	)
}
