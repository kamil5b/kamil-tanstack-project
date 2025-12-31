import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/product/')({
  component: RouteComponent,
  loader: async () => {
    return await fetch('/api/product/').then(res => res.json());
  }
})

function RouteComponent() {
  return <div>Hello "/product/"!</div>
}
