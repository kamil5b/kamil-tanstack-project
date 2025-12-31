import { z } from 'zod';

export const BaseEntitySchema = z.object({
  id: z.uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable().optional(),
});