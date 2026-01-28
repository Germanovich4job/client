import { AppBar, Typography, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { Link } from "@tanstack/react-router";

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
        paddingLeft: "20px",
        maxWidth: "inherit",
        height: "48px",
      }}
    >
      <Typography
        variant="h6"
        className="text-blue-100 hover:text-white transition-all"
      >
        <Link to="/">НОВА СНАБ</Link>
      </Typography>
      <div className="flex flex-row justify-end">
        <Button href="/auth/login" color="inherit">
          Войти
        </Button>
        <Button href="/auth/register" color="inherit">
          Зарегистрироваться
        </Button>
        <Button href="/logout" color="inherit">
          <Logout fontSize="large" className="scale-75" />
        </Button>
      </div>
    </AppBar>
  );
};

export default Header;
