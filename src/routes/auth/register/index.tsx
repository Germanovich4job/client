import { createFileRoute } from "@tanstack/react-router"
import AuthForm from "../../../components/AuthForm"

export const Route = createFileRoute("/auth/register/")({
  component: RouteComponent,
})

function RouteComponent() {
  return <AuthForm mode="register" />
}
