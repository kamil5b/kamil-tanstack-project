import FormTemplate from '@/client/templates/FormTemplate'
import { CreateProductRequestSchema } from '@/shared/requests/schemas/product'
import { type CreateProductRequest } from '@/shared/requests/types/product'

export default function ProductFormTemplate(props: {
	initial?: Partial<CreateProductRequest>
	onSave?: (data: CreateProductRequest) => void
}) {
	const { initial = {}, onSave } = props

	return (
		<FormTemplate
			title={initial?.name ? 'Edit Product' : 'Create Product'}
			schema={CreateProductRequestSchema}
			initialValues={{
				name: initial.name ?? '',
				items: initial.items ?? [],
				tags: initial.tags ?? [],
			}}
			fieldOverrides={[
				{ name: 'name', label: 'Name', placeholder: 'Product name' },
				{ name: 'items', label: 'Items', placeholder: 'Add items' },
				{ name: 'tags', label: 'Tags', placeholder: 'Add tag UUID' },
			]}
			onSubmit={(values) => {
				// With schema-driven form the values are already structured according to CreateProductRequestSchema
				onSave?.(values as CreateProductRequest)
				console.log('save product', values)
			}}
		/>
	)
}
