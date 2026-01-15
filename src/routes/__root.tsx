import * as React from "react"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

import { Link, Outlet, createRootRoute } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div>Hello "__root"!</div>
      <Link to="/">Главная</Link>
      <Link to="/products">Товары</Link>
      <Outlet />
      <TanStackRouterDevtools />
    </React.Fragment>
  )
}
