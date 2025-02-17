import APPCONSTANTS from "../../../values/appconsts";

import { Box, Typography } from "@mui/material";
import { memo } from "react";
import moment from "moment";

export type FooterProps = {
  lastRevisionDate?: string;
};

const Footer = (props: FooterProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: `${APPCONSTANTS.footerFixedHeight}px`,
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Typography component="div" sx={{ fontSize: "12px" }}>
        &copy;
        {`${moment().format("YYYY")} ${APPCONSTANTS.footerDesc} | ${
          APPCONSTANTS.versionDesc
        }`}
        {props.lastRevisionDate ?? ""}
      </Typography>
    </Box>
  );
};

export default memo(Footer);
