import { Product } from "@/shared/entities/types/product";
import { ProductResponse } from "@/shared/responses/types/product";
import { InMemoryProductDB, InMemoryProductToTagDB } from "../../db/db.inmemory";

export const InMemoryProductRepository = {
	upsertProduct: async (e: Product): Promise<void> => {
		InMemoryProductDB.upsertProduct(e);
	},

	deleteProduct: async (id: string): Promise<void> => {
		InMemoryProductDB.deleteProduct(id);
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

