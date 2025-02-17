import { Breadcrumbs, Link } from "@mui/material";
import { memo, useEffect } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { RouteMappingConsts } from "../../../values/routemappingsource";

export type Crumb = {
  display: string;
  fullTrailLink: string;
};

export type BreadCrumbsNavigatorProps = {};

const BreadCrumbsNavigator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [crumbs, setCrumbs] = React.useState<Crumb[]>([]);
  useEffect(() => {
    let breadcrumbs: Crumb[] = [];
    let paths = location.pathname.split("/");
    paths.splice(0, 1);
    paths.forEach((segment, idx) => {
      var combinedPath = "";
      var currentIdx = 0;
      while (currentIdx <= idx) {
        combinedPath += `/${paths[currentIdx]}`;
        currentIdx++;
      }
      var route = RouteMappingConsts.find((route) =>
        matchPath(
          {
            path: route.routePattern,
            end: true,
          },
          combinedPath
        )
      );
      if (route) {
        breadcrumbs.push({
          display: route.title === "" ? segment : route.title,
          fullTrailLink: combinedPath,
        });
      }
    });
    setCrumbs(breadcrumbs);
  }, [location, setCrumbs]);
  return (
    <Breadcrumbs separator=">">
      {crumbs.map((crumb, index, { length }) => {
        if (length - 1 === index)
          // this is the last one
          return (
            <Link
              sx={{ fontSize: "12px", fontWeight: "bold" }}
              underline="none"
              key={crumb.display}
              color="text.primary"
            >
              {crumb.display}
            </Link>
          );
        else
          return (
            <Link
              sx={{ fontSize: "12px" }}
              component="button"
              key={crumb.display}
              color="inherit"
              onClick={() => {
                navigate(crumb.fullTrailLink);
              }}
            >
              {crumb.display}
            </Link>
          );
      })}
    </Breadcrumbs>
  );
};

export default memo(BreadCrumbsNavigator);
