import { Tag } from "@/shared/entities/types/tag";
import { PaginationRequest } from "@/shared/requests/types/common";
import { CreateTagRequest, UpdateTagRequest } from "@/shared/requests/types/tag";
import { TagsListResponse } from "@/shared/responses/types/tag";


export interface TagService {
    listTag(req: PaginationRequest): Promise<TagsListResponse>;
    createTag(req: CreateTagRequest): Promise<void>;
    deleteTag(id: string): Promise<void>;
    updateTag(req: UpdateTagRequest): Promise<void>;
}

export interface TagRepository {
    upsertTag(e: Tag): Promise<void>;
    deleteTag(id: string): Promise<void>;
    tagPagination(page: number, limit: number): Promise<{ data: Tag[]; total: number; page: number; limit: number }>;
}