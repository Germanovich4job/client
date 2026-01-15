import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  return (
    <div>
      <div>Index</div>
      <Link to="/about">About</Link>
    </div>
  )
}
