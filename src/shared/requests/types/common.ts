import type { z } from "zod";
import type { PaginationRequestSchema } from "../schemas/common";

export type PaginationRequest = z.infer<typeof PaginationRequestSchema>;
