import type { z } from "zod";
import type { AccountSchema, SessionSchema, UserSchema, VerificationSchema } from "../schemas/auth";

export type User = z.infer<typeof UserSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type Account = z.infer<typeof AccountSchema>;
export type Verification = z.infer<typeof VerificationSchema>;