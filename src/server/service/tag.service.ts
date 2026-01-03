import { Tag } from "@/shared/entities/types/tag";
import { PaginationRequest } from "@/shared/requests/types/common";
import { CreateTagRequest, UpdateTagRequest } from "@/shared/requests/types/tag";
import { TagsListResponse } from "@/shared/responses/types/tag";
import { TagService, TagRepository } from "@/server/interfaces/tag.interface";

export class TagServiceImpl implements TagService {
    constructor(private repo: TagRepository) {}

    async listTag(req: PaginationRequest): Promise<TagsListResponse> {
        const page = Math.max(1, req.page ?? 1);
        const limit = Math.max(1, req.limit ?? 10);
        const result = await this.repo.tagPagination(page, limit);
        return {
            data: result.data,
            meta: {
                totalItems: result.total,
                page: result.page,
                limit: result.limit,
                totalPages: Math.ceil(result.total / result.limit),
            },
        };  
    }

    async createTag(req: CreateTagRequest): Promise<void> {
        if (!req || !req.name) throw new Error("Invalid tag data");
        const now = new Date();

        const tag: Tag = {
            id: crypto.randomUUID(),
            name: req.name,
            color: req.color,
            createdAt: now,
            updatedAt: now,
        } as Tag;
        await this.repo.upsertTag(tag);
    }

    async deleteTag(id: string): Promise<void> {
        if (!id) throw new Error("Tag id required");
        await this.repo.deleteTag(id);
    }

    async updateTag(req: UpdateTagRequest): Promise<void> {
        if (!req || !("id" in req) || !req.id) throw new Error("Tag id required for update");
        const updatedAt = new Date();
        // Merge provided fields into a Tag-shaped object; repository is responsible for full persistence.
        const tag = {
            ...(req as Partial<Tag>),
            updatedAt,
        } as Tag;
        await this.repo.upsertTag(tag);
    }

    async getTagByID(id: string): Promise<Tag> {
        return await this.repo.getTagByID(id);
    }
}

export const createTagService = (repo: TagRepository): TagService => new TagServiceImpl(repo);