import { z } from 'zod';
import { ProductSchema } from '../../entities/schemas/product';
import { PaginationResponseSchema } from '../schemas/common';
import { TagSchema } from '@/shared/entities/schemas/tag';

export const ProductResponseSchema = ProductSchema.extend({
    tags: z.array(TagSchema),
});

export const ProductsListResponseSchema = PaginationResponseSchema.extend({
  data: z.array(ProductResponseSchema),
});
