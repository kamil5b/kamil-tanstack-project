import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tag/')({
  component: RouteComponent,
  loader: async () => {
    return await fetch('/api/tag/').then(res => res.json());
  }
})

function RouteComponent() {
  return <div>Hello "/tag/"!</div>
}
