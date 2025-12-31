
import { z } from 'zod';
import { ProductSchema, ItemSchema } from '../schemas/product';

export type Product = z.infer<typeof ProductSchema>;
export type Item = z.infer<typeof ItemSchema>;
