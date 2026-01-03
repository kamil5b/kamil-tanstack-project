import { FormTemplate } from '@/client/templates/FormTemplate'
import { Tag } from '@/shared/entities/types/tag'
import { CreateTagRequestSchema } from '@/shared/requests/schemas/tag'
import { UpdateTagRequest, type CreateTagRequest } from '@/shared/requests/types/tag'

export default function TagFormTemplate(props: {
	initial?: Partial<Tag>
	onSave: (data: CreateTagRequest) => void
	onEdit?: (data: UpdateTagRequest) => void
}) {
	
	// const schema = props.onEdit ? UpdateTagRequestSchema : CreateTagRequestSchema
	// const { onSave, onEdit } = props
	
	return (
		<FormTemplate
		schema={CreateTagRequestSchema}
		onSubmit={props.onSave}
		/>
	)
}

// did it support edit/initial data? and id field must be hidden