import { FormTemplate } from "@/client/templates/FormTemplate";
import type { Tag } from "@/shared/entities/types/tag";
import {
  CreateTagRequestSchema,
  UpdateTagRequestSchema,
} from "@/shared/requests/schemas/tag";
import type {
  CreateTagRequest,
  UpdateTagRequest,
} from "@/shared/requests/types/tag";

export default function TagFormTemplate(props: {
  initial?: Partial<Tag>;
  onSave?: (data: CreateTagRequest) => void;
  onEdit?: (data: UpdateTagRequest) => void;
}) {
  const defaultValues = {
    id: props.initial?.id,
    name: props.initial?.name ?? "",
    color: props.initial?.color,
  };
  if (props.initial) {
    return (
      <FormTemplate
        schema={UpdateTagRequestSchema}
        // We wrap in a function to handle the case where onEdit is undefined
        onSubmit={(data) => props.onEdit?.(data)}
        defaultValues={defaultValues}
      />
    );
  }
  return (
    <FormTemplate
      schema={CreateTagRequestSchema}
      onSubmit={(data) => props.onSave?.(data)}
      defaultValues={defaultValues}
    />
  );
}

// did it support edit/initial data? and id field must be hidden
