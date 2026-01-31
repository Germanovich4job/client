import { useGetAllProductsQuery } from "../services/productsApi";
import { useNavigate } from "@tanstack/react-router";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { LinearProgress } from "@mui/material";

const ProductList = () => {
  const navigate = useNavigate({ from: "/products" });
  const { data: products, isLoading } = useGetAllProductsQuery({});

  const handleOpen = ({ id }) => {
    navigate({ to: `/products/${id}` });
  };

  const columns: GridColDef<(typeof products)[number]>[] = [
    {
      field: "title",
      headerName: "Наименование",
      editable: false,
      minWidth: 140,
      flex: 1,
    },
    {
      field: "category",
      headerName: "Категория",
      editable: false,
      minWidth: 140,
      flex: 1,
    },
    {
      field: "manufacturer",
      headerName: "Производитель",
      editable: false,
      minWidth: 140,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Стоимость",
      editable: false,
      minWidth: 140,
    },
    {
      field: "quantity",
      headerName: "Остаток",
      editable: false,
      minWidth: 140,
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%", paddingBottom: "100px" }}>
      {isLoading && <LinearProgress />}
      {products && (
        <DataGrid
          sx={{
            ".MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
          }}
          rows={products}
          columns={columns}
          onRowClick={handleOpen}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
};

export default ProductList;
