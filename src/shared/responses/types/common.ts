import type { z } from "zod";
import type {
  PaginationMetaResponseSchema,
  PaginationResponseSchema,
} from "../schemas/common";

export type PaginationMetaResponse = z.infer<
  typeof PaginationMetaResponseSchema
>;
export type PaginationResponse = z.infer<typeof PaginationResponseSchema>;
