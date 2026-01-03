import { z } from "zod";
import { TagSchema } from "@/shared/entities/schemas/tag";
import { ProductSchema } from "../../entities/schemas/product";
import { PaginationResponseSchema } from "../schemas/common";

export const ProductResponseSchema = ProductSchema.extend({
  tags: z.array(TagSchema),
});

export const ProductsListResponseSchema = PaginationResponseSchema.extend({
  data: z.array(ProductResponseSchema),
});
