import { z } from 'zod';
import { TagResponseSchema, TagsListResponseSchema } from '../schemas/tag';

export type TagResponse = z.infer<typeof TagResponseSchema>;
export type TagsListResponse = z.infer<typeof TagsListResponseSchema>;
