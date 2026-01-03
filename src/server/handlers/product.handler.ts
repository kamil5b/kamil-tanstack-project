import { createServerFn } from "@tanstack/react-start";
import { PaginationRequestSchema } from "@/shared/requests/schemas/common";
import {
  CreateProductRequestSchema,
  UpdateProductRequestSchema,
} from "@/shared/requests/schemas/product";
import { initInjection } from "../bootstrap";

export const getProductList = createServerFn({
  method: "GET",
})
  .inputValidator(PaginationRequestSchema)
  .handler(async ({ data }) => {
    const svc = initInjection();
    return await svc.productSvc.listProduct({
      page: data.page,
      limit: data.limit,
    });
  });
export const getProductByID = createServerFn({
  method: "GET",
})
  .inputValidator((d: string) => d)
  .handler(async ({ data }) => {
    const svc = initInjection();
    return await svc.productSvc.getProductById(data);
  });

export const createProduct = createServerFn({
  method: "POST",
})
  .inputValidator(CreateProductRequestSchema)
  .handler(async ({ data }) => {
    const svc = initInjection();
    await svc.productSvc.createProduct(data);
  });

export const updateProduct = createServerFn({
  method: "POST",
})
  .inputValidator(UpdateProductRequestSchema)
  .handler(async ({ data }) => {
    const svc = initInjection();
    await svc.productSvc.updateProduct(data);
  });

export const deleteProduct = createServerFn({
  method: "POST",
})
  .inputValidator((d: string) => d)
  .handler(async ({ data }) => {
    const svc = initInjection();
    await svc.productSvc.deleteProduct(data);
  });
