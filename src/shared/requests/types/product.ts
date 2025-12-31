import { z } from 'zod';
import { CreateProductRequestSchema, UpdateProductRequestSchema, ItemCreateSchema } from '../schemas/product';

export type CreateProductRequest = z.infer<typeof CreateProductRequestSchema>;
export type UpdateProductRequest = z.infer<typeof UpdateProductRequestSchema>;
export type ItemCreate = z.infer<typeof ItemCreateSchema>;
