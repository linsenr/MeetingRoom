import { JSX } from "react";
import { Feature } from "../../enums/features";

export type MenuItemVM = {
    display: string;
    itemKey: Feature;
    icon: JSX.Element;
    weight: number;
}