import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

export const Sidebar = () => {
  return (
    <div>
      <Button size="small" href="/products/add" variant="contained">
        <Add fontSize="small" />
        Добавить
      </Button>
    </div>
  );
};
