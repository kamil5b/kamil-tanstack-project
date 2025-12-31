import { z } from 'zod';
import { BaseEntitySchema } from './common';

export const ItemSchema = BaseEntitySchema.extend({
  productId: z.uuid(),
  name: z.string(),
  quantity: z.number().min(0),
  unitQuantity: z.string(),
  unitPrice: z.number().min(0),
  totalPrice: z.number().min(0),
});

export const ProductSchema = BaseEntitySchema.extend({
  name: z.string(),
  totalPrice: z.number().min(0),
  items: z.array(ItemSchema).default([]),
  tags: z.array(z.uuid()).default([]),
});

export type _Test = z.infer<typeof ProductSchema>;
