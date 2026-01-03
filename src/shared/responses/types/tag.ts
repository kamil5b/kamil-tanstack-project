import type { z } from "zod";
import type { TagResponseSchema, TagsListResponseSchema } from "../schemas/tag";

export type TagResponse = z.infer<typeof TagResponseSchema>;
export type TagsListResponse = z.infer<typeof TagsListResponseSchema>;
