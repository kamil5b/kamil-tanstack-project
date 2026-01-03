import { z } from "zod";

export const ItemCreateSchema = z.object({
  name: z.string(),
  quantity: z.number().min(0),
  unitQuantity: z.string(),
  unitPrice: z.number().min(0),
  totalPrice: z.number().min(0),
});

export const CreateProductRequestSchema = z.object({
  name: z.string(),
  items: z.array(ItemCreateSchema).default([]),
  tags: z.array(z.uuid()).default([]),
});

export const UpdateProductRequestSchema =
  CreateProductRequestSchema.partial().extend({
    id: z.uuid(),
  });
