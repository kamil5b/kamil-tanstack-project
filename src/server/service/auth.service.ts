import { AuthRepository, AuthService } from "../interfaces/auth.interface";
import { betterAuth } from "better-auth";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export class AuthServiceImpl implements AuthService {
  public auth: ReturnType<typeof betterAuth>;

  constructor(private repo: AuthRepository) {
    // Initialize auth inside the constructor to ensure 'this.repo' is bound
    this.auth = betterAuth({
      database: {
        create: async (args: any) => await this.repo.create(args),
        findOne: async (args: any) => await this.repo.findOne(args),
        findMany: async (args: any) => await this.repo.findMany(args),
        update: async (args: any) => await this.repo.update(args),
        delete: async (args: any) => await this.repo.delete(args),
      },
      plugins: [tanstackStartCookies()],
      emailAndPassword: { enabled: true },
    });
  }
}

export const createAuthService = (repo: AuthRepository): AuthService =>
  new AuthServiceImpl(repo);
