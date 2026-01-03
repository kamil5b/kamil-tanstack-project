import type { z } from "zod";
import type { TagSchema } from "../schemas/tag";

export type Tag = z.infer<typeof TagSchema>;
