import { createFileRoute } from "@tanstack/react-router";
import ProductList from "@/client/pages/ProductList";
import { getProductList } from "@/server";
import { PaginationRequestSchema } from "@/shared/requests/schemas/common";

export const Route = createFileRoute("/product/")({
  component: RouteComponent,
  validateSearch: PaginationRequestSchema,
  loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
  loader: async ({ deps }) => {
    return await getProductList({ data: deps });
  },
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const loaderData = Route.useLoaderData();

  const data = loaderData?.data ?? [];
  const meta = loaderData?.meta ?? {
    page: 1,
    totalPages: 1,
    limit: 10,
    totalItems: 0,
  };

  function onPageChange(page: number) {
    // 3. Simplified navigation
    navigate({
      search: (prev) => ({ ...prev, page }),
    });
  }

  return <ProductList data={data} meta={meta} onPageChange={onPageChange} />;
}
