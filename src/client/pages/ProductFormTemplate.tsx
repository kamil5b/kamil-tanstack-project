import { FormTemplate } from '@/client/templates/FormTemplate'
import { Product } from '@/shared/entities/types/product'
import { CreateProductRequestSchema } from '@/shared/requests/schemas/product'
import { UpdateProductRequest, type CreateProductRequest } from '@/shared/requests/types/product'

export default function ProductFormTemplate(props: {
	initial?: Partial<Product>
	onSave: (data: CreateProductRequest) => void
	onEdit?: (data: UpdateProductRequest) => void
}) {
	
	// const schema = props.onEdit ? UpdateProductRequestSchema : CreateProductRequestSchema
	// const { onSave, onEdit } = props
	
	return (
		<FormTemplate
		schema={CreateProductRequestSchema}
		onSubmit={props.onSave}
		/>
	)
}

// did it support edit/initial data? and id field must be hidden