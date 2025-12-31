import { z } from 'zod';
import { ProductSchema } from '../../entities/schemas/product';
import { PaginationResponseSchema } from '../schemas/common';

export const ProductResponseSchema = ProductSchema;

export const ProductsListResponseSchema = PaginationResponseSchema.extend({
  data: z.array(ProductResponseSchema),
});
