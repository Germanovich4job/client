import { createFileRoute } from "@tanstack/react-router"
import AuthForm from "../../../components/AuthForm"

export const Route = createFileRoute("/auth/login/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthForm mode="login" />
}
