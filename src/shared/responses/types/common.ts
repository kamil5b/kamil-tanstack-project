import { PaginationResponseSchema, PaginationMetaResponseSchema } from '../schemas/common';
import { z } from 'zod';

export type PaginationMetaResponse = z.infer<typeof PaginationMetaResponseSchema>;
export type PaginationResponse = z.infer<typeof PaginationResponseSchema>;