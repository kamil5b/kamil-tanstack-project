import type { z } from "zod";
import type { BaseEntitySchema } from "../schemas/common";

export type BaseEntity = z.infer<typeof BaseEntitySchema>;
