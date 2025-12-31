import { Tag } from "@/shared/entities/types/tag";
import { InMemoryTagDB } from "../../db/db.inmemory";

export const InMemoryTagRepository = {
	upsertTag: async (e: Tag): Promise<void> => {
		InMemoryTagDB.upsertTag(e);
	},

	deleteTag: async (id: string): Promise<void> => {
		InMemoryTagDB.deleteTag(id);
	},

	tagPagination: async (
		page: number,
		limit: number
	): Promise<{ data: Tag[]; total: number; page: number; limit: number }> => {
		const tags = InMemoryTagDB.getTags();
		const total = tags.length;
		const start = Math.max(0, (page - 1) * limit);
		const slice = tags.slice(start, start + limit);
		return { data: slice, total, page, limit };
	},
};

