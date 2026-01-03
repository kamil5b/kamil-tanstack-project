import FormTemplate from '@/client/templates/FormTemplate'
import { Product } from '@/shared/entities/types/product'
import { CreateProductRequestSchema, UpdateProductRequestSchema } from '@/shared/requests/schemas/product'
import { UpdateProductRequest, type CreateProductRequest } from '@/shared/requests/types/product'

export default function ProductFormTemplate(props: {
	initial?: Partial<Product>
	onSave?: (data: CreateProductRequest) => void
	onEdit?: (data: UpdateProductRequest) => void
}) {
	const { initial = {}, onSave, onEdit } = props

	return (
		<FormTemplate
			title={initial?.name ? 'Edit Product' : 'Create Product'}
			schema={onEdit ? UpdateProductRequestSchema : CreateProductRequestSchema}
			initialValues={{
				id: initial.id,
				name: initial.name ?? '',
				items: initial.items ?? [],
				tags: initial.tags ?? [],
			}}
			onSubmit={(values) => {
				// With schema-driven form the values are already structured according to CreateProductRequestSchema
				if (values.id) {
					onEdit?.(values as UpdateProductRequest)
				} else {
					onSave?.(values as CreateProductRequest)
				}
				console.log('save product', values)
				window.location.href = '/product'; // Redirect to products list after save
			}}
		/>
	)
}
