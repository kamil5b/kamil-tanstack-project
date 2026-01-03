import { z } from "zod";

export const CreateTagRequestSchema = z.object({
  name: z.string(),
  color: z.string().optional(),
});

export const UpdateTagRequestSchema = CreateTagRequestSchema.partial().extend({
  id: z.uuid(),
});
