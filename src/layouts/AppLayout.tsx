import { Outlet, useNavigate } from "@tanstack/react-router";
import Header from "../components/Header";
import "../App.css";
import { Box, Card, Tab, Tabs } from "@mui/material";
import { useState } from "react";

export const AppLayout = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  const handleSelect = (_, i) => {
    const tabPaths = {
      0: "/products",
      1: "/warehousers",
      2: "/shipments",
      3: "/movements",
      4: "/returns",
      5: "/prices",
      6: "/analytics",
      7: "/employees",
      8: "/contractors",
    };
    setTabIndex(i);

    navigate({ to: tabPaths[i] });
  };

  return (
    <>
      <div className="h-screen overflow-hidden bg-blue-100 flex flex-col gap-2">
        <header className="h-12 bg-white flex items-center justify-center">
          <Header />
        </header>
        <main className="flex h-full w-full flex-row gap-2">
          <div className="w-72 bg-white"></div>

          <div className="overflow-auto h-full w-full bg-white">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabIndex}
                onChange={handleSelect}
                aria-label="basic tabs example"
              >
                <Tab label="Товары" tabIndex={0} />
                <Tab label="Склады" tabIndex={1} />
                <Tab label="Отгрузки" tabIndex={2} />
                <Tab label="Перемещения" tabIndex={3} />
                <Tab label="Возвраты" tabIndex={4} />
                <Tab label="Прайсы" tabIndex={5} />
                <Tab label="Аналитика" tabIndex={6} />
                <Tab label="Сотрудники" tabIndex={7} />
                <Tab label="Объекты" tabIndex={8} />
              </Tabs>
            </Box>
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};
