import { Feature } from "../enums/features";
import { RouteMapping } from "../types/routemappingmodel";
import Routes from "./routeconsts";

//TODO: fix this and RouteMapping.tsx
export const RouteMappingConsts: RouteMapping[] = [
  {
    feature: Feature.CommonHome,
    routePattern: Routes.Home,
    title: "Home",
  }
];
