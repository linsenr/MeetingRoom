import { Box, Typography } from "@mui/material";
import React from "react";

export type ErrorProps = {};
const Error = (props: ErrorProps) => {
  return (
    <Box>
      <Typography>Unauthorized</Typography>
      <Typography>Please contact system administrator</Typography>
    </Box>
  );
};

export default Error;
