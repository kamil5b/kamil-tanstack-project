import { AuthRepository, AuthService } from "../interfaces/auth.interface";
import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";


export class AuthServiceImpl implements AuthService {
  constructor(private repo: AuthRepository) {}
    auth = betterAuth({
    database: {
        // Map the adapter methods to your InMemoryAuthDB methods
        create: async (args: any) => await this.repo.create(args),
        findOne: async (args: any) => await this.repo.findOne(args),
        findMany: async (args: any) => await this.repo.findMany(args),
        update: async (args: any) => await this.repo.update(args),
        delete: async (args: any) => await this.repo.delete(args),
    },
    plugins: [tanstackStartCookies()],
    emailAndPassword: { enabled: true }
    });
}

export const createAuthService = (repo: AuthRepository): AuthService =>
  new AuthServiceImpl(repo);
