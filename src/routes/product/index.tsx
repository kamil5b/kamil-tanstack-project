import { createFileRoute, useRouter } from '@tanstack/react-router'
import ProductList from '@/client/pages/ProductList'
import { PaginationRequest } from '@/shared/requests/types/common'

export const Route = createFileRoute('/product/')({
  component: RouteComponent,
  loader: async () => {
    return await fetch(`${process.env.PUBLIC_URL || 'http://localhost:3000'}/api/product`).then((res) => res.json())
  },
})

function RouteComponent() {
  const router = useRouter()
  const loaderData = Route.useLoaderData() as any
  const data = loaderData?.data ?? []
  const meta = loaderData?.meta ?? { page: 1, totalPages: 1, limit: 10, totalItems: 0 }

  function onPageChange(page: number) {
    router.navigate({ to:'/product/', search: (s: PaginationRequest) => ({ ...(s??{limit: meta.limit}), page }) })
  }

  return <ProductList data={data} meta={meta} onPageChange={onPageChange} />
}
