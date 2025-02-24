import React from "react";
import { Box } from "@mui/material";
import { memo } from "react";
import BreadCrumbsNavigator from "../../components/organisms/BreadCrumbsNavigator/BreadCrumbsNavigator";
import Footer from "../../components/organisms/footer/footer";
import Menu from "../../components/organisms/menu/menu";
import APPCONSTANTS from "../../values/appconsts";
import { Routes, Route, Outlet } from "react-router-dom";
import UserManagement from "../UserManagement/UserManagement";
import RoomManagement from "../RoomManagement/RoomManagement";
import BookingManagement from "../BookingManagement/BookingManagement";
import BookingManage from "../BookingManage/BookingManage";

const Main = () => {
  try {
    return (
      <Box sx={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <Box sx={{ width: 240 }}>
          <Menu />
        </Box>
        <Box sx={{ flex: 1, p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    );
  } catch (error) {
    console.error("Error rendering Main component:", error);
    return <Box>Failed to load the main page.</Box>;
  }
};

export default memo(Main);
