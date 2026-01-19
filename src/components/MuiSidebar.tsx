import React from "react"
import { Sidebar, Menu, MenuItem, Submenu } from "react-mui-sidebar"
import { Button } from "@mui/material"
import { useNavigate } from "@tanstack/react-router"

export const MuiSidebar = () => {
  const navigate = useNavigate({ from: "/products" })
  const handleAddProduct = () => {
    navigate({ to: "/products/add" })
  }

  return (
    <Sidebar width={"300px"}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProduct}
        className="w-fit"
      >
        Добавить продукт
      </Button>
      <Menu subHeading="OTHERS">
        <Submenu title="Menu Level">
          <MenuItem>Post</MenuItem>
          <MenuItem>Details</MenuItem>
          <Submenu title="Level 2">
            <MenuItem>new</MenuItem>
            <MenuItem>Hello</MenuItem>
          </Submenu>
        </Submenu>
      </Menu>
      <Menu subHeading="OTHERS">
        <Submenu title="Menu Level">
          <MenuItem>Post</MenuItem>
          <MenuItem>Details</MenuItem>
          <Submenu title="Level 2">
            <MenuItem>new</MenuItem>
            <MenuItem>Hello</MenuItem>
          </Submenu>
        </Submenu>
      </Menu>
    </Sidebar>
  )
}
