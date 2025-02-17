import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LocationProps } from "../../types/LocationProps";

export type ErrorPageProps = {};
const ErrorPage = (props: ErrorPageProps) => {
  const location = useLocation() as unknown as LocationProps;
  const state = location.state;

  const [data, setData] = React.useState<string>("");
  useEffect(() => {
    if (state) {
      setData(state.homeData);
    } else {
      setData("");
    }
  }, []);
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h1">Access Denied</Typography>
      <Typography variant="h5"> Reason: {data}</Typography>
    </Box>
  );
};

export default ErrorPage;
