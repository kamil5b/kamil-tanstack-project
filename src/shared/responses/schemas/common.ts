import { z } from 'zod';

export const PaginationMetaResponseSchema = z.object({
  page: z.number().min(1).default(1),
  totalPages: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  totalItems: z.number().min(0).default(0),
});

export const PaginationResponseSchema = z.object({
  data: z.array(z.unknown()),
  meta: PaginationMetaResponseSchema,
});