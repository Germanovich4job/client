import { Box, Tab, Tabs, Typography } from "@mui/material";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [tabIndex, setTabIndex] = useState(1);
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabIndex}
          onChange={(v, i) => setTabIndex(i)}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" tabIndex={1} />
          <Tab label="Item Two" tabIndex={2} />
          <Tab label="Item Three" tabIndex={3} />
        </Tabs>
      </Box>
      <Outlet />
    </>
  );
}
