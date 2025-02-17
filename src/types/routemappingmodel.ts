import { Feature } from "../enums/features"

export type RouteMapping = {
    feature: Feature;
    routePattern: string;
    title: string;
}