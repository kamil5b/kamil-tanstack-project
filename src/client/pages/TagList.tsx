import { Link } from "@tanstack/react-router";
import PaginationListTemplate from "@/client/templates/PaginationListTemplate";
import { TagResponseSchema } from "@/shared/responses/schemas/tag";
import type {
  TagResponse,
  TagsListResponse,
} from "@/shared/responses/types/tag";
import { Badge } from "../components/ui/badge";

export default function TagList({
  data,
  meta,
  onPageChange,
}: TagsListResponse & { onPageChange?: (page: number) => void }) {
  const rows = data ?? [];
  const paging = meta ?? { page: 1, totalPages: 1, limit: 10, totalItems: 0 };

  const columns = [
    { key: "name", header: "Name" },
    {
      key: "color",
      header: "Tags",
      render: (r: TagResponse) => {
        // Badge using shadcn /ui, use tags.name and tags.color if available
        return (
          <div className="flex flex-wrap gap-1">
            {r.color && (
              <Badge key={r.id} style={{ backgroundColor: r.color }}>
                {r.name}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (r: TagResponse) => <Link to={`/tag/edit/${r.id}`}>Edit</Link>,
    },
  ];
  return (
    <PaginationListTemplate
      title="Tags"
      columns={columns}
      itemSchema={TagResponseSchema}
      data={rows}
      meta={paging}
      onPageChange={onPageChange}
      createPageUrl="/tag/new"
    />
  );
}
