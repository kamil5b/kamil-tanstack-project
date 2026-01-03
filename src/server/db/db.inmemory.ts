import type { Item, Product } from "@/shared/entities/types/product";
import type { Tag } from "@/shared/entities/types/tag";

type TProductToTag = {
  productId: string;
  tagId: string;
};

type TProduct = Omit<Product, "tags" | "items">;
type TItem = Item;
type TTag = Tag;
// In-memory tables populated with some example data

const tableProducts: TProduct[] = [
  {
    id: "prod-1",
    name: "Red T-Shirt",
    totalPrice: 299.85 + 199.9,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "prod-2",
    name: "Blue Jeans",
    totalPrice: 249.95,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const tableItems: TItem[] = [
  {
    id: "item-1",
    productId: "prod-1",
    name: "REDTSHIRT-S",
    quantity: 10,
    unitQuantity: "1",
    unitPrice: 19.99,
    totalPrice: 199.9,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "item-2",
    productId: "prod-1",
    name: "REDTSHIRT-M",
    quantity: 15,
    unitQuantity: "1",
    unitPrice: 19.99,
    totalPrice: 299.85,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "item-3",
    productId: "prod-2",
    name: "BLUEJEANS-32",
    quantity: 5,
    unitQuantity: "1",
    unitPrice: 49.99,
    totalPrice: 249.95,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const tableTags: TTag[] = [
  {
    id: "tag-1",
    name: "Summer",
    color: "#FFD700",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "tag-2",
    name: "Sale",
    color: "#FF6347",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const tableTProductToTags: TProductToTag[] = [
  { productId: "prod-1", tagId: "tag-1" },
  { productId: "prod-1", tagId: "tag-2" },
  { productId: "prod-2", tagId: "tag-2" },
];

export const InMemoryProductDB = {
  getProducts: (): TProduct[] => {
    return tableProducts;
  },

  getProductById: (id: string): TProduct | undefined => {
    return tableProducts.find((p) => p.id === id);
  },

  getProductsByIds: (ids: string[]): TProduct[] => {
    return tableProducts.filter((p) => ids.includes(p.id));
  },

  upsertProduct: (product: TProduct): void => {
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

export const InMemoryItemDB = {
  getItems: (): TItem[] => {
    return tableItems;
  },

  getItemsByProductId: (productId: string): TItem[] => {
    return tableItems.filter((it) => it.productId === productId);
  },

  upsertItem: (item: TItem): void => {
    const index = tableItems.findIndex((it) => it.id === item.id);
    if (index >= 0) {
      tableItems[index] = item;
    } else {
      tableItems.push(item);
    }
  },

  createBulkItems: (items: Omit<TItem, "id">[], productId: string): void => {
    items.forEach((item) => {
      tableItems.push({ ...item, id: crypto.randomUUID(), productId });
    });
  },

  deleteItem: (id: string): void => {
    const index = tableItems.findIndex((it) => it.id === id);
    if (index >= 0) {
      tableItems.splice(index, 1);
    }
  },

  deleteItemByProductId: (productId: string): void => {
    for (let i = tableItems.length - 1; i >= 0; i--) {
      if (tableItems[i].productId === productId) {
        tableItems.splice(i, 1);
      }
    }
  },
};

export const InMemoryTagDB = {
  getTags: (): TTag[] => {
    return tableTags;
  },

  getTagById: (id: string): TTag | undefined => {
    return tableTags.find((t) => t.id === id);
  },

  getTagByIds: (ids: string[]): TTag[] => {
    return tableTags.filter((t) => ids.includes(t.id));
  },

  upsertTag: (tag: TTag): void => {
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
    const exists = tableTProductToTags.find(
      (ptt) => ptt.productId === productId && ptt.tagId === tagId,
    );
    if (!exists) {
      tableTProductToTags.push({ productId, tagId });
    }
  },

  bulkAddTagsToProduct: (productId: string, tagIds: string[]): void => {
    tagIds.forEach((tagId) => {
      const exists = tableTProductToTags.find(
        (ptt) => ptt.productId === productId && ptt.tagId === tagId,
      );
      if (!exists) {
        tableTProductToTags.push({ productId, tagId });
      }
    });
  },

  removeTagFromProduct: (productId: string, tagId: string): void => {
    const index = tableTProductToTags.findIndex(
      (ptt) => ptt.productId === productId && ptt.tagId === tagId,
    );
    if (index >= 0) {
      tableTProductToTags.splice(index, 1);
    }
  },

  removeProductFromTagId: (tagId: string): void => {
    for (let i = tableTProductToTags.length - 1; i >= 0; i--) {
      if (tableTProductToTags[i].tagId === tagId) {
        tableTProductToTags.splice(i, 1);
      }
    }
  },
  removeTagFromProductId: (productId: string): void => {
    for (let i = tableTProductToTags.length - 1; i >= 0; i--) {
      if (tableTProductToTags[i].productId === productId) {
        tableTProductToTags.splice(i, 1);
      }
    }
  },

  getTagsForProduct: (productId: string): Tag[] => {
    const tagIds = tableTProductToTags
      .filter((ptt) => ptt.productId === productId)
      .map((ptt) => ptt.tagId);
    return tableTags.filter((t) => tagIds.includes(t.id));
  },
};
