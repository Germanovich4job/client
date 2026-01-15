import * as React from "react"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

import { createRootRoute } from "@tanstack/react-router"
import { AppLayout } from "../layouts/AppLayout"

const isProduction = process.env.NODE_ENV === "production"
export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <AppLayout />
      {!isProduction && (
        <TanStackRouterDevtools
          position="bottom-left"
          toggleButtonProps={{ style: { bottom: "10%" } }}
        />
      )}
    </React.Fragment>
  )
}
