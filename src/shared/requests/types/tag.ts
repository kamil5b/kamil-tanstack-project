import { z } from 'zod';
import { CreateTagRequestSchema, UpdateTagRequestSchema } from '../schemas/tag';

export type CreateTagRequest = z.infer<typeof CreateTagRequestSchema>;
export type UpdateTagRequest = z.infer<typeof UpdateTagRequestSchema>;