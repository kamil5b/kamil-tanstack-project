import { Auth } from "better-auth";

export interface AuthService {
  auth: Auth;
}

export interface AuthRepository {
  // for better auth
   create({ modelName, data }: { modelName: string; data: any }): Promise<any>;

  findOne({ modelName, where }: { modelName: string; where: any[] }): Promise<any>;

  findMany({ modelName, where }: { modelName: string; where?: any[] }): Promise<any[]>;

  update({ modelName, where, update }: { modelName: string; where: any[]; update: any }): Promise<any>;

  delete({ modelName, where }: { modelName: string; where: any[] }): Promise<void>;
}