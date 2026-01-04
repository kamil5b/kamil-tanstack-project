import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
    baseURL: window.location.origin // Points to your TanStack Start server
});