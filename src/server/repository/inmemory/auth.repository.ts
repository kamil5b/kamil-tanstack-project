import { InMemoryAuthDB } from "@/server/db/db.inmemory";


export const InMemoryAuthRepository = {
  // for better auth
  create: async ({ modelName, data }: { modelName: string; data: any }): Promise<any> => {
    return InMemoryAuthDB.create({ modelName, data });
  },

  findOne: async ({ modelName, where }: { modelName: string; where: any[] }): Promise<any> => {
    return InMemoryAuthDB.findOne({ modelName, where });
  },

  findMany: async ({ modelName, where }: { modelName: string; where?: any[] }): Promise<any[]> => {
    return InMemoryAuthDB.findMany({ modelName, where });
  },

  update: async ({ modelName, where, update }: { modelName: string; where: any[]; update: any   }): Promise<any> => {
    return InMemoryAuthDB.update({ modelName, where, update });
  },

  delete: async ({ modelName, where }: { modelName: string; where: any[] }): Promise<void> => {
    return InMemoryAuthDB.delete({ modelName, where });
  },
};