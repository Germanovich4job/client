import { AppBar, Typography, Button, Link } from "@mui/material"
import { Login } from "@mui/icons-material"
import { createLink } from "@tanstack/react-router"
import type { LinkProps } from "@mui/material"
import type { LinkComponent } from "@tanstack/react-router"
import { forwardRef } from "react"

interface MUILinkProps extends LinkProps {
  // Add any additional props you want to pass to the Link
}
const MUILinkComponent = forwardRef<HTMLAnchorElement, MUILinkProps>(
  (props, ref) => <Link ref={ref} {...props} />,
)
const CreatedLinkComponent = createLink(MUILinkComponent)
export const CustomLink: LinkComponent<typeof MUILinkComponent> = props => {
  return <CreatedLinkComponent preload={"intent"} {...props} />
}

const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px",
        maxWidth: "inherit",
      }}
    >
      <Typography variant="h6">СТРОЙСНАБЖЕНИЕ</Typography>
      <Button href="/products" color="inherit">
        К продукции
      </Button>
      <Button href="/admin" color="inherit">
        Панель
      </Button>
      <Button href="/logout" color="inherit">
        Выйти
      </Button>
      <Button href="/auth/login" color="inherit">
        Войти
      </Button>
      <Button href="/auth/register" color="inherit">
        Зарегистрироваться
      </Button>
      <Login fontSize="large" />
    </AppBar>
  )
}

export default Header
