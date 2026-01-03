import { FormTemplate, AsyncSource } from '@/client/templates/FormTemplate'
import { getTagList } from '@/server'
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

	const asyncRegistry: Record<string, AsyncSource> = {
		tags: {
			fetcher: async ({ page, limit }: { page: number; limit: number }) => {
				const res = await getTagList({ data: { page, limit } });
				return res;
			},
			getValue: (item: { id: string; name: string }) => item.id,
			getLabel: (item: { id: string; name: string }) => item.name,
		},
	}
	
	return (
		<FormTemplate
		schema={CreateProductRequestSchema}
		onSubmit={props.onSave}
		asyncRegistry={asyncRegistry}
		/>
	)
}

// did it support edit/initial data? and id field must be hidden