import { createFileRoute } from "@tanstack/react-router"
import ProductForm from "../../../components/ProductForm"

export const Route = createFileRoute("/products/edit/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <ProductForm open={true} mode="edit" onClose={() => {}} />
}
