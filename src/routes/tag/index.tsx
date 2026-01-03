import { createFileRoute } from "@tanstack/react-router";
import TagList from "@/client/pages/TagList";
import { getTagList } from "@/server";
import { PaginationRequestSchema } from "@/shared/requests/schemas/common";

export const Route = createFileRoute("/tag/")({
  component: RouteComponent,
  validateSearch: PaginationRequestSchema,
  loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
  loader: async ({ deps }) => {
    return await getTagList({ data: deps });
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

  return <TagList data={data} meta={meta} onPageChange={onPageChange} />;
}
