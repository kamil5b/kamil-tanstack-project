import { z } from "zod";
import { TagSchema } from "../../entities/schemas/tag";
import { PaginationResponseSchema } from "../schemas/common";

export const TagResponseSchema = TagSchema;

export const TagsListResponseSchema = PaginationResponseSchema.extend({
  data: z.array(TagResponseSchema),
});
