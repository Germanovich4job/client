import React from "react"
import { Sidebar, Menu, MenuItem, Submenu, Logo } from "react-mui-sidebar"
import { Container, Typography } from "@mui/material"

export const MuiSidebar = () => {
  return (
    <div className="w-75">
      <Container className="fixed">
        <Sidebar width={"300px"}>
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
      </Container>
    </div>
  )
}
