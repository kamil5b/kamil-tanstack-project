"use client";

import { FormTemplate } from "@/client/templates/FormTemplate";
import { AsyncSource } from "@/client/components/AsyncSelects";
import { getTagList } from "@/server";
import { Product } from "@/shared/entities/types/product";
import {
  CreateProductRequestSchema,
  UpdateProductRequestSchema,
} from "@/shared/requests/schemas/product";
import {
  UpdateProductRequest,
  type CreateProductRequest,
} from "@/shared/requests/types/product";

export default function ProductFormTemplate(props: {
  initial?: Partial<Product>;
  onSave?: (data: CreateProductRequest) => void;
  onEdit?: (data: UpdateProductRequest) => void;
}) {
  const asyncRegistry: Record<string, AsyncSource> = {
    tags: {
      fetcher: async ({ page, limit }: { page: number; limit: number }) => {
        const res = await getTagList({ data: { page, limit } });
        return res;
      },
      getValue: (item: { id: string; name: string }) => item.id,
      getLabel: (item: { id: string; name: string }) => item.name,
    },
  };

  const defaultValues = {
    id: props.initial?.id,
    name: props.initial?.name ?? "",
    items: props.initial?.items ?? [],
    tags: props.initial?.tags ?? [],
  };

  // 1. Handle EDIT Mode
  // If we have initial data, we use the Update Schema and the onEdit handler
  if (props.initial) {
    return (
      <FormTemplate
        schema={UpdateProductRequestSchema}
        // We wrap in a function to handle the case where onEdit is undefined
        onSubmit={(data) => props.onEdit?.(data)}
        asyncRegistry={asyncRegistry}
        defaultValues={defaultValues}
      />
    );
  }

  // 2. Handle CREATE Mode
  // Otherwise, we use the Create Schema and the onSave handler
  return (
    <FormTemplate
      schema={CreateProductRequestSchema}
      onSubmit={(data) => props.onSave?.(data)}
      asyncRegistry={asyncRegistry}
    />
  );
}