import React from "react";
import { Feature } from "../enums/features";
import Routes from "./routeconsts";

export type RouteComponentMapping = {
  path: string;
  component: React.ReactNode;
};

export const RouteMappings: { [key in string]: RouteComponentMapping } = {};
