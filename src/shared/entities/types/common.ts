import { BaseEntitySchema } from '../schemas/common';
import { z } from 'zod';

export type BaseEntity = z.infer<typeof BaseEntitySchema>;