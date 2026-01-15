import { createLazyFileRoute, Link } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/about")({
  component: About,
})

function About() {
  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Hello /about</h1>
    </div>
  )
}
