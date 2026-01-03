import { Product } from "@/shared/entities/types/product";
import { PaginationRequest } from "@/shared/requests/types/common";
import { CreateProductRequest, UpdateProductRequest } from "@/shared/requests/types/product";
import { ProductResponse, ProductsListResponse } from "@/shared/responses/types/product";


export interface ProductService {
    listProduct(req: PaginationRequest): Promise<ProductsListResponse>;
    createProduct(req: CreateProductRequest): Promise<void>;
    getProductById(id: string): Promise<ProductResponse>;
    deleteProduct(id: string): Promise<void>;
    updateProduct(req: UpdateProductRequest): Promise<void>;
}

export interface ProductRepository {
    upsertProduct(e: Product): Promise<void>;
    deleteProduct(id: string): Promise<void>;
    getProductById(id: string): Promise<ProductResponse>;
    productPagination(page: number, limit: number): Promise<{ data: ProductResponse[]; total: number; page: number; limit: number }>;
}