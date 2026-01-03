import type { Tag } from "@/shared/entities/types/tag";
import { InMemoryProductToTagDB, InMemoryTagDB } from "../../db/db.inmemory";

export const InMemoryTagRepository = {
  upsertTag: async (e: Tag): Promise<void> => {
    InMemoryTagDB.upsertTag(e);
  },

  deleteTag: async (id: string): Promise<void> => {
    InMemoryProductToTagDB.removeProductFromTagId(id);
    InMemoryTagDB.deleteTag(id);
  },

  tagPagination: async (
    page: number,
    limit: number,
  ): Promise<{ data: Tag[]; total: number; page: number; limit: number }> => {
    const tags = InMemoryTagDB.getTags();
    const total = tags.length;
    const start = Math.max(0, (page - 1) * limit);
    const slice = tags.slice(start, start + limit);
    return { data: slice, total, page, limit };
  },
  getTagByID: async (id: string): Promise<Tag> => {
    const tag = InMemoryTagDB.getTagById(id);
    if (!tag) throw new Error("Tag not found");
    return tag;
  },
};
