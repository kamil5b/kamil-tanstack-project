import type {
  ProductRepository,
  ProductService,
} from "@/server/interfaces/product.interface";
import type { Product } from "@/shared/entities/types/product";
import type { PaginationRequest } from "@/shared/requests/types/common";
import type {
  CreateProductRequest,
  ItemCreate,
  UpdateProductRequest,
} from "@/shared/requests/types/product";
import type {
  ProductResponse,
  ProductsListResponse,
} from "@/shared/responses/types/product";

export class ProductServiceImpl implements ProductService {
  constructor(private repo: ProductRepository) {}

  async listProduct(req: PaginationRequest): Promise<ProductsListResponse> {
    const page = Math.max(1, req.page ?? 1);
    const limit = Math.max(1, req.limit ?? 10);
    const result = await this.repo.productPagination(page, limit);
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
  async getProductById(id: string): Promise<ProductResponse> {
    return await this.repo.getProductById(id);
  }

  async createProduct(req: CreateProductRequest): Promise<void> {
    if (!req || !req.name) throw new Error("Invalid product data");
    const now = new Date();
    const productId = crypto.randomUUID();
    const items =
      req.items?.map((it: ItemCreate) => ({
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
        productId: productId,
        name: it.name,
        quantity: it.quantity,
        unitQuantity: it.unitQuantity,
        unitPrice: it.unitPrice,
        totalPrice: it.totalPrice,
      })) ?? [];

    const product: Product = {
      id: productId,
      name: req.name,
      totalPrice: items.reduce((sum, item) => sum + item.totalPrice, 0),
      items,
      tags: req.tags ?? [],
      createdAt: now,
      updatedAt: now,
    } as Product;
    await this.repo.upsertProduct(product);
  }

  async deleteProduct(id: string): Promise<void> {
    if (!id) throw new Error("Product id required");
    await this.repo.deleteProduct(id);
  }

  async updateProduct(req: UpdateProductRequest): Promise<void> {
    if (!req || !("id" in req) || !req.id)
      throw new Error("Product id required for update");
    const updatedAt = new Date();
    // Merge provided fields into a Product-shaped object; repository is responsible for full persistence.
    const product = {
      ...(req as Partial<Product>),
      updatedAt,
    } as Product;
    await this.repo.upsertProduct(product);
  }
}

export const createProductService = (repo: ProductRepository): ProductService =>
  new ProductServiceImpl(repo);
