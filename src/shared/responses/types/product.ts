import type { z } from "zod";
import type {
  ProductResponseSchema,
  ProductsListResponseSchema,
} from "../schemas/product";

export type ProductResponse = z.infer<typeof ProductResponseSchema>;
export type ProductsListResponse = z.infer<typeof ProductsListResponseSchema>;
