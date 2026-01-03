import PaginationListTemplate from '@/client/templates/PaginationListTemplate'
import { ProductResponseSchema } from '@/shared/responses/schemas/product'
import { ProductResponse, ProductsListResponse } from '@/shared/responses/types/product'
import { Link } from '@tanstack/react-router'
import { Badge } from '../components/ui/badge'

export default function ProductList({ data, meta, onPageChange }: ProductsListResponse & { onPageChange?: (page: number) => void }) {
  const rows = data ?? []
  const paging = meta ?? { page: 1, totalPages: 1, limit: 10, totalItems: 0 }

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'totalPrice', header: 'Total Price', render: (r: ProductResponse) => `$${(r.totalPrice ?? 0).toFixed(2)}` },
    { key: 'items', header: 'Items', render: (r: ProductResponse) => (r.items?.length ?? 0) },
    { key: 'tags', header: 'Tags', render: (r: ProductResponse) => {
        // Badge using shadcn /ui, use tags.name and tags.color if available
        return (
          <div className="flex flex-wrap gap-1">
            {(r.tags ?? []).map((tag) => (
              <Badge key={tag.id} style={{ backgroundColor: tag.color }}>
                {tag.name}
              </Badge>
            ))}
          </div>
        )
    } },
    { key: 'actions', header: 'Actions', render: (r: ProductResponse) => <Link to={`/product/edit/${r.id}`}>Edit</Link> },
  ]
  return (
    <PaginationListTemplate
      title="Products"
      columns={columns}
      itemSchema={ProductResponseSchema}
      data={rows}
      meta={paging}
      onPageChange={onPageChange}
      createPageUrl="/product/new"
    />
  )
}
