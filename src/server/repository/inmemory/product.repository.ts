import { Product } from "@/shared/entities/types/product";
import { ProductResponse } from "@/shared/responses/types/product";
import { InMemoryItemDB, InMemoryProductDB, InMemoryProductToTagDB } from "../../db/db.inmemory";

export const InMemoryProductRepository = {
	upsertProduct: async (e: Product): Promise<void> => {
        InMemoryItemDB.deleteItemByProductId(e.id);
        InMemoryProductToTagDB.removeTagFromProductId(e.id);
        InMemoryProductToTagDB.bulkAddTagsToProduct(e.id, e.tags || []);
        InMemoryItemDB.createBulkItems(e.items || [], e.id);
		InMemoryProductDB.upsertProduct(e);
	},

	deleteProduct: async (id: string): Promise<void> => {
        InMemoryItemDB.deleteItemByProductId(id);
        InMemoryProductToTagDB.removeTagFromProductId(id);
		InMemoryProductDB.deleteProduct(id);
	},

	getProductById: async (id: string): Promise<ProductResponse> => {
		const product = InMemoryProductDB.getProductById(id);
		if (!product) throw new Error("Product not found");

		const tags = InMemoryProductToTagDB.getTagsForProduct(product.id);
		return {
			...product,
			tags,
		} as ProductResponse;
	},

	productPagination: async (
		page: number,
		limit: number
	): Promise<{ data: ProductResponse[]; total: number; page: number; limit: number }> => {
		const products = InMemoryProductDB.getProducts();
		const total = products.length;
		const start = Math.max(0, (page - 1) * limit);
		const slice = products.slice(start, start + limit);

		const data: ProductResponse[] = slice.map((p) => {
			const tags = InMemoryProductToTagDB.getTagsForProduct(p.id);
			return {
				...p,
				tags,
			} as ProductResponse;
		});

		return { data, total, page, limit };
	},
};

