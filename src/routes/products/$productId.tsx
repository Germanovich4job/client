import { createFileRoute } from "@tanstack/react-router"

type ProductParam = {
  page: number
}

export const Route = createFileRoute("/products/$productId")({
  component: ProductItem,
  validateSearch: (search: Record<string, unknown>): ProductParam => {
    return {
      page: Number(search?.page ?? 1),
    }
  },
})

function ProductItem() {
  const { productId } = Route.useParams()
  const { page } = Route.useSearch()
  return (
    <div>
      Hello "/products/$productId"!
      {
        <h1>
          {productId} + {page}{" "}
        </h1>
      }
    </div>
  )
}
