import { z } from 'zod';
import { BaseEntitySchema } from './common';

export const TagSchema = BaseEntitySchema.extend({
  id: z.uuid(),
  name: z.string(),
  color: z.string().optional(),
});

export type _TagTest = z.infer<typeof TagSchema>;
