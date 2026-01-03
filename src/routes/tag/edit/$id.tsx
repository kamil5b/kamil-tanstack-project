import { createFileRoute } from "@tanstack/react-router";
import TagFormTemplate from "@/client/pages/TagFormTemplate";
import { getTagByID, updateTag } from "@/server";
import type { UpdateTagRequest } from "@/shared/requests/types/tag";

export const Route = createFileRoute("/tag/edit/$id")({
  component: RouteComponent,
  loader: async ({ params }) => await getTagByID({ data: params.id }),
});

function RouteComponent() {
  const handleSave = async (req: UpdateTagRequest) => {
    try {
      return await updateTag({ data: req });
    } catch (err) {
      console.error("Error saving tag", err);
      void alert("Failed to save tag");
    }
  };
  const initialData = Route.useLoaderData();

  console.log("Initial tag data:", initialData);

  return <TagFormTemplate initial={initialData} onEdit={handleSave} />;
}
