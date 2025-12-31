import { initInjection } from '@/server'
import { PaginationRequestSchema } from '@/shared/requests/schemas/common';
import { CreateProductRequestSchema, UpdateProductRequestSchema } from '@/shared/requests/schemas/product';
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/product/')({
  validateSearch: (search) => PaginationRequestSchema.parse(search),
  server: {
    handlers: {
      GET: async ({ request }) => {
        const svc = initInjection();

        // Manual extraction for API handlers
        const url = new URL(request.url);
        const searchParams = Object.fromEntries(url.searchParams);
        const { page, limit } = PaginationRequestSchema.parse(searchParams);

        const list = await svc.productSvc.listProduct({ page, limit });
        return json(list);
      },
      POST: async ({ request }) => {
        const svc = initInjection();
        const body = await request.json();

        // Validate and use the result of parsing
        const validated = CreateProductRequestSchema.parse(body);
        const created = await svc.productSvc.createProduct(validated);

        return json(created, { status: 201 });
      },
      PATCH: async ({ request }) => {
        const svc = initInjection();
        const body = await request.json();

        const validated = UpdateProductRequestSchema.parse(body);
        const updated = await svc.productSvc.updateProduct(validated);
        return json(updated);
      },
    },
  },
})