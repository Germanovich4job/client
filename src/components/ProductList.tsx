"use client"

import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  AppBar,
} from "@mui/material"

import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../services/productsApi"
import ProductForm from "./ProductForm"
import { useNavigate } from "@tanstack/react-router"

import Box from "@mui/material/Box"
import { DataGrid, GridColDef } from "@mui/x-data-grid"

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
  {
    field: "button",
    headerName: "Доступные действия",
    description: "",
    sortable: false,
    width: 250,
    renderCell: () => <Button>Совершить действие</Button>,
  },
]

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
]

const ProductList = () => {
  const [openAddModal, setOpenAddModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [currentProductForEdit, setCurrentProductForEdit] = useState(null)

  const navigate = useNavigate({ from: "/products" })

  const { data: products, isError } = useGetAllProductsQuery()
  const [deleteProduct, { isLoading: deleteProductLoading }] =
    useDeleteProductMutation()

  const handleAddProduct = () => {
    setOpenAddModal(true)
  }

  const handleEditProduct = product => {
    setCurrentProductForEdit(product)
    setOpenEditModal(true)
  }

  const handleDeleteProduct = id => {
    deleteProduct(id)
  }

  const handleOpen = (id: string) => {
    navigate({ to: `/products/${id}` })
  }

  return (
    <div className="w-full p-4 gap-2 flex flex-col">
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          className="w-full"
        />
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Наименование</TableCell>
              <TableCell>Категория</TableCell>
              <TableCell>Производитель</TableCell>
              <TableCell align="right">Стоимость</TableCell>
              <TableCell align="right">Кол-во</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((row, i) => (
              <TableRow
                key={i}
                className="hover:bg-gray-100"
                onClick={() => handleOpen(row.id)}
              >
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.manufacturer}</TableCell>
                <TableCell align="right">{row.price.toFixed(2)} ₽</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => handleEditProduct(row)}
                  >
                    Редактировать
                  </Button>{" "}
                  <Button
                    size="small"
                    color="secondary"
                    variant="outlined"
                    onClick={() => handleDeleteProduct(row.id)}
                  >
                    {deleteProductLoading ? "Удаление" : "Удалить"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ProductList
