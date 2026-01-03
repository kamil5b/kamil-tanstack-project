import { createFileRoute } from "@tanstack/react-router";
import ProductFormTemplate from "@/client/pages/ProductFormTemplate";
import { getProductByID, updateProduct } from "@/server";
import type { UpdateProductRequest } from "@/shared/requests/types/product";

export const Route = createFileRoute("/product/edit/$id")({
  component: RouteComponent,
  loader: async ({ params }) => await getProductByID({ data: params.id }),
});

function RouteComponent() {
  const handleSave = async (req: UpdateProductRequest) => {
    try {
      return await updateProduct({ data: req });
    } catch (err) {
      console.error("Error saving product", err);
      void alert("Failed to save product");
    }
  };

  const initialData = Route.useLoaderData();

  // Map tag objects to string names for the form template
  const initialForForm = {
    ...initialData,
    tags: initialData.tags?.map((tag: { name: string }) => tag.name) ?? [],
  };

  return <ProductFormTemplate initial={initialForForm} onEdit={handleSave} />;
}
