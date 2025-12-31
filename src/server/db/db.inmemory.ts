import { Product } from "@/shared/entities/types/product";
import { Tag } from "@/shared/entities/types/tag";

type ProductToTag = {
    productId: string;
    tagId: string;
}

const tableProducts: Product[] = [];
const tableTags: Tag[] = [];
const tableProductToTags: ProductToTag[] = [];

export const InMemoryProductDB = {
    getProducts: (): Product[] => {
        return tableProducts;
    },

    getProductById: (id: string): Product | undefined => {
        return tableProducts.find((p) => p.id === id);
    },

    getProductsByIds: (ids: string[]): Product[] => {
        return tableProducts.filter((p) => ids.includes(p.id));
    },

    upsertProduct: (product: Product): void => {
        const index = tableProducts.findIndex((p) => p.id === product.id);
        if (index >= 0) {
            tableProducts[index] = product;
        } else {
            tableProducts.push(product);
        }
    },

    deleteProduct: (id: string): void => {
        const index = tableProducts.findIndex((p) => p.id === id);
        if (index >= 0) {
            tableProducts.splice(index, 1);
        }
    },
};

export const InMemoryTagDB = {
    getTags: (): Tag[] => {
        return tableTags;
    },

    getTagById: (id: string): Tag | undefined => {
        return tableTags.find((t) => t.id === id);
    },

    getTagByIds: (ids: string[]): Tag[] => {
        return tableTags.filter((t) => ids.includes(t.id));
    },

    upsertTag: (tag: Tag): void => {
        const index = tableTags.findIndex((t) => t.id === tag.id);
        if (index >= 0) {
            tableTags[index] = tag;
        } else {
            tableTags.push(tag);
        }
    },

    deleteTag: (id: string): void => {
        const index = tableTags.findIndex((t) => t.id === id);
        if (index >= 0) {
            tableTags.splice(index, 1);
        }
    },
};

export const InMemoryProductToTagDB = {
    addTagToProduct: (productId: string, tagId: string): void => {
        const exists = tableProductToTags.find((ptt) => ptt.productId === productId && ptt.tagId === tagId);
        if (!exists) {
            tableProductToTags.push({ productId, tagId });
        }
    },

    removeTagFromProduct: (productId: string, tagId: string): void => {
        const index = tableProductToTags.findIndex((ptt) => ptt.productId === productId && ptt.tagId === tagId);
        if (index >= 0) {
            tableProductToTags.splice(index, 1);
        }
    },

    getTagsForProduct: (productId: string): Tag[] => {
        const tagIds = tableProductToTags
            .filter((ptt) => ptt.productId === productId)
            .map((ptt) => ptt.tagId);
        return tableTags.filter((t) => tagIds.includes(t.id));
    },
};