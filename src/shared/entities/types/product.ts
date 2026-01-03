import type { z } from "zod";
import type { ItemSchema, ProductSchema } from "../schemas/product";

export type Product = z.infer<typeof ProductSchema>;
export type Item = z.infer<typeof ItemSchema>;
