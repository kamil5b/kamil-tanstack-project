import { z } from 'zod';
import { ProductResponseSchema, ProductsListResponseSchema } from '../schemas/product';

export type ProductResponse = z.infer<typeof ProductResponseSchema>;
export type ProductsListResponse = z.infer<typeof ProductsListResponseSchema>;
