import type { z } from "zod";
import type {
  CreateTagRequestSchema,
  UpdateTagRequestSchema,
} from "../schemas/tag";

export type CreateTagRequest = z.infer<typeof CreateTagRequestSchema>;
export type UpdateTagRequest = z.infer<typeof UpdateTagRequestSchema>;
