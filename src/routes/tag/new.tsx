import { createFileRoute } from "@tanstack/react-router";
import TagFormTemplate from "@/client/pages/TagFormTemplate";
import { createTag } from "@/server";
import type { CreateTagRequest } from "@/shared/requests/types/tag";

export const Route = createFileRoute("/tag/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const handleSave = async (req: CreateTagRequest) => {
    try {
      return await createTag({ data: req });
    } catch (err) {
      console.error("Error saving tag", err);
      void alert("Failed to save tag");
    }
  };

  return <TagFormTemplate onSave={handleSave} />;
}
