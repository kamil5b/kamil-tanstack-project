import { initInjection } from '@/server'
import { PaginationRequestSchema } from '@/shared/requests/schemas/common';
import { CreateTagRequestSchema, UpdateTagRequestSchema } from '@/shared/requests/schemas/tag';
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/tag/')({
  validateSearch: (search) => PaginationRequestSchema.parse(search),
  server: {
    handlers: {
      GET: async ({ request }) => {
        const svc = initInjection();

        // Manual extraction for API handlers
        const url = new URL(request.url);
        const searchParams = Object.fromEntries(url.searchParams);
        const { page, limit } = PaginationRequestSchema.parse(searchParams);

        const list = await svc.tagSvc.listTag({ page, limit });
        return json(list);
      },
      POST: async ({ request }) => {
        const svc = initInjection();
        const body = await request.json();

        // Validate and use the result of parsing
        const validated = CreateTagRequestSchema.parse(body);
        await svc.tagSvc.createTag(validated);

        // Service returns void; respond with a JSON-serializable value.
        return json({message: "Tag created successfully"}, { status: 201 });
      },
      PATCH: async ({ request }) => {
        const svc = initInjection();
        const body = await request.json();

        const validated = UpdateTagRequestSchema.parse(body);
        await svc.tagSvc.updateTag(validated);
        return json({message: "Tag updated successfully"}, { status: 200 });
      },
    },
  },
})