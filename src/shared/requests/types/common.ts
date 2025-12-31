import { PaginationRequestSchema } from '../schemas/common';
import { z } from 'zod';

export type PaginationRequest = z.infer<typeof PaginationRequestSchema>;