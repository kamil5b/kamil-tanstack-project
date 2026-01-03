import { createServerFn } from "@tanstack/react-start";
import { PaginationRequestSchema } from "@/shared/requests/schemas/common";
import {
  CreateTagRequestSchema,
  UpdateTagRequestSchema,
} from "@/shared/requests/schemas/tag";
import { initInjection } from "../bootstrap";

export const getTagList = createServerFn({
  method: "GET",
})
  .inputValidator(PaginationRequestSchema)
  .handler(async ({ data }) => {
    const svc = initInjection();
    return await svc.tagSvc.listTag({ page: data.page, limit: data.limit });
  });

export const getTagByID = createServerFn({
  method: "GET",
})
  .inputValidator((d: string) => d)
  .handler(async ({ data }) => {
    const svc = initInjection();
    return await svc.tagSvc.getTagByID(data);
  });

export const createTag = createServerFn({
  method: "POST",
})
  .inputValidator(CreateTagRequestSchema)
  .handler(async ({ data }) => {
    const svc = initInjection();
    await svc.tagSvc.createTag(data);
  });

export const updateTag = createServerFn({
  method: "POST",
})
  .inputValidator(UpdateTagRequestSchema)
  .handler(async ({ data }) => {
    const svc = initInjection();
    await svc.tagSvc.updateTag(data);
  });

export const deleteTag = createServerFn({
  method: "POST",
})
  .inputValidator((d: string) => d)
  .handler(async ({ data }) => {
    const svc = initInjection();
    await svc.tagSvc.deleteTag(data);
  });
