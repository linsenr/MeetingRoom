import { Box } from "@mui/material";
import { memo, useContext, useEffect } from "react";
import BreadCrumbsNavigator from "../../components/organisms/BreadCrumbsNavigator/BreadCrumbsNavigator";
import Footer from "../../components/organisms/footer/footer";
// import Header from "../../components/organisms/header/Header";
import Menu from "../../components/organisms/menu/menu";
import { Feature } from "../../enums/features";
import React from "react";
import { useNavigate } from "react-router-dom";
import { RouteMappings } from "../../values/routemappings";
import APPCONSTANTS from "../../values/appconsts";

export type MainProps = {};

const Main = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* <Header /> */}
      {/* Body */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: `calc(100% - ${APPCONSTANTS.headerFixedHeight}px - ${APPCONSTANTS.footerFixedHeight}px)`,
          width: "100%",
        }}
      >
        <Menu />
        <Box
          sx={{
            height: "100%",
            width: "100%",
            marginTop: `${APPCONSTANTS.headerFixedHeight}px`,
            display: "flex",
            flexDirection: "column",
            paddingLeft: 1,
            paddingRight: 1,
          }}
        >
          <BreadCrumbsNavigator />
          <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
            {/* <SRSRouter /> */}
          </Box>
        </Box>
      </Box>
      {/* Body */}
      <Footer />
    </Box>
  );
};

export default memo(Main);
