import { z } from 'zod';
import { TagSchema } from '../schemas/tag';

export type Tag = z.infer<typeof TagSchema>;
