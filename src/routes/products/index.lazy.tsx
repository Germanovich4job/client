import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/products/")({
  component: ProductIndex,
})

function ProductIndex() {
  return <div>Hello "/products/"!</div>
}
