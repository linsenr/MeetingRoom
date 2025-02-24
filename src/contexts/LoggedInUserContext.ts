import React from "react";
import { BoardDropdownItemVM } from "../apis/response/User/BoardDropdownItemVM.type";
import { Feature } from "../enums/features";
import { SRSToken, UserRole } from "../types/SRSToken.type";
import { MenuItemVM } from "../types/viewmodels/menuitemvm.type";

export interface LoggedInUserContextType {
  getAssessmentPanels: () => Promise<BoardDropdownItemVM[]>;
  getFunctionList: () => Promise<string[]>;
  getRoleList: () => Promise<UserRole[]>;
  updateCurrentRoleId: (roleId: number) => void;
  refreshToken: () => Promise<void>;
  //props
  CurrentUserInfo: SRSToken | null;
  CurrentRole: UserRole | null;
  CurrentFeatures: Feature[];
  CurrentMenuItems: MenuItemVM[];
  CurrentFunctionList: string[];
  AvailableRoles: UserRole[];
  // CurrentAssessmentPanels: BoardDropdownItemVM[];
  CurrentReportsItems:MenuItemVM[];
  CurrentSystemItems:MenuItemVM[];
}

const defaultLoggedInUserContext: LoggedInUserContextType = {
  getAssessmentPanels: () => Promise.resolve([]),
  getFunctionList: () => Promise.resolve([]),
  getRoleList: () => Promise.resolve([]),
  refreshToken: () => Promise.resolve(),
  updateCurrentRoleId: () => {},
  CurrentUserInfo: null,
  CurrentRole: null,
  CurrentFeatures: [],
  CurrentMenuItems: [],
  CurrentFunctionList: [],
  AvailableRoles: [],
  // CurrentAssessmentPanels: [],
  CurrentReportsItems:[],
  CurrentSystemItems:[]
};

export const LoggedInUserContext = React.createContext<LoggedInUserContextType>(
  defaultLoggedInUserContext
);
