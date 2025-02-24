import { JwtPayload } from "jwt-decode";

export interface SRSToken extends JwtPayload {
  adId: string;
  userId: number;
  staffName: string;
  userName: string;
  roleList: string;
}

export interface UserRole {
  roleName: string;
  roleId: number;
  roleCode: string;
  isDefault: boolean;
  isBoardRole: boolean;
  authorizedFunctionIdList: string[]
  authorizedRankAbbrList: string[]
}