import {
  Collapse,
  CSSObject,
  Divider,
  Drawer,
  List,
  styled,
  Theme,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { memo } from "react";
import MenuItem from "../../molecules/menuitem/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { COLORS } from "../../../values/colors";
import APPCONSTANTS from "../../../values/appconsts";
import { Feature } from "../../../enums/features";
import { ReportSubMenuItem } from "../../../values/report_submenu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import UICONSTANTS from "../../../values/uiconsts";
import { StylingConsts } from "../../../values/styling.consts";
import Routes from "../../../values/routeconsts";
import { RouteMappings } from "../../../values/routemappings";
import { useNavigate, useLocation } from "react-router-dom";
import { iterate } from "localforage";
import { LoggedInUserContext } from "../../../contexts/LoggedInUserContext";
import {
  People, // 人员管理
  MeetingRoom, // 会议室
  EventNote, // 会议预约
  Assignment, // 预约管理
  Login,
  Logout,
  Person,
} from "@mui/icons-material";

export type MenuProps = {};

interface MenuItem {
  title: string;
  icon: React.ReactElement;
  path?: string;
  show: boolean;
  onClick?: () => void;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: StylingConsts.drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: StylingConsts.drawerWidth,
  height: "100%",
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const MoreStyleDrawer = styled(StyledDrawer)`
  svg path {
    fill: ${COLORS.white};
  }

  .MuiListItemIcon-root {
    color: ${COLORS.white};
  }
  .MuiListItemText-root {
    color: ${COLORS.white};
  }
  .MuiDivider-root {
    background-color: ${COLORS.white};
  }
  .MuiListItemButton-root.Mui-selected {
    background-color: transparent;
    .MuiListItemIcon-root {
      color: ${COLORS.black};
    }
    .MuiListItemText-root {
      color: ${COLORS.black};
    }
    svg path {
      fill: ${COLORS.black};
    }

    .MuiTypography-root {
      font-weight: bold;
    }
  }
`;

const Menu = (props: MenuProps) => {
  //context
  const { CurrentMenuItems, CurrentReportsItems, CurrentSystemItems } =
    useContext(LoggedInUserContext);

  //hooks
  const navigate = useNavigate();
  const location = useLocation();

  //states
  const [selectedItemKey, setSelectedMenuItemKey] = React.useState<Feature>();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(true);
  const [isCollapseListOpen, setCollapseListOpen] =
    React.useState<boolean>(false);
  const [sysIsCollapseListOpen, setSysCollapseListOpen] =
    React.useState<boolean>(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user.role === "admin";
  const isLoggedIn = !!localStorage.getItem("token");

  //handlers
  const handleMenuItemClick = (featKey: any) => {
    navigate(`${Routes.Home}/${RouteMappings[featKey].path}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLogoutDialogOpen(false);
    setSnackbarOpen(true);
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  // 管理员菜单项
  const adminMenuItems: MenuItem[] = [
    {
      title: "人员管理",
      icon: <People />,
      path: "/user-management",
      show: isAdmin && isLoggedIn,
    },
    {
      title: "会议室管理",
      icon: <MeetingRoom />,
      path: "/room-management",
      show: isAdmin && isLoggedIn,
    },
    {
      title: "预约管理",
      icon: <Assignment />,
      path: "/booking-manage",
      show: isAdmin && isLoggedIn,
    },
  ];

  // 普通用户菜单项
  const userMenuItems: MenuItem[] = [
    {
      title: "会议室预约",
      icon: <EventNote />,
      path: "/meeting-booking",
      show: isLoggedIn,
    },
    {
      title: "我的预约",
      icon: <Person />,
      path: "/my-bookings",
      show: isLoggedIn,
    },
  ];

  // 认证相关菜单项
  const authMenuItems: MenuItem[] = [
    {
      title: "登入",
      icon: <Login />,
      path: "/login",
      show: !isLoggedIn,
    },
    {
      title: "登出",
      icon: <Logout />,
      onClick: () => setLogoutDialogOpen(true),
      show: isLoggedIn,
    },
  ];

  return (
    <>
      <MoreStyleDrawer
        variant="permanent"
        open={isDrawerOpen}
        PaperProps={{
          sx: {
            backgroundColor: COLORS.srs_green,
            height: `calc(100% - ${APPCONSTANTS.headerFixedHeight}px - ${APPCONSTANTS.footerFixedHeight}px)`,
            //height: `calc(100% - ${APPCONSTANTS.headerFixedHeight}px - ${APPCONSTANTS.footerFixedHeight}px)`,
            top: APPCONSTANTS.headerFixedHeight,
            borderRight: "0px",
            minHeight: "100%",
            "& .MuiList-root": {
              paddingBottom: "100px",
            },
            "& .MuiPaper-root": {
              minHeight: "auto !importtant",
            },
          },
        }}
      >
        <List key={"menu-item-list-container"} dense>
          <MenuItem
            display={UICONSTANTS.menuitem_menu}
            uid={Feature.CommonHome}
            icon={<MenuIcon />}
            isSelected={false}
            isDrawerOpening={isDrawerOpen}
            onClick={() => {
              setIsDrawerOpen(!isDrawerOpen);
            }}
          />
          <Divider />
          {CurrentMenuItems.map((itm, idx, { length }) => {
            return (
              <React.Fragment key={`feat-menu-frag-${idx}`}>
                {itm.itemKey === Feature.CommonHome ? (
                  <>
                    <MenuItem
                      display={itm.display}
                      uid={itm.itemKey}
                      icon={itm.icon}
                      endIcon={
                        isCollapseListOpen ? <ExpandLess /> : <ExpandMore />
                      }
                      isDrawerOpening={isDrawerOpen}
                      isSelected={false}
                      onClick={() => {
                        setCollapseListOpen(!isCollapseListOpen);
                      }}
                    />
                    <Collapse
                      in={isCollapseListOpen}
                      timeout="auto"
                      unmountOnExit
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: "0.75rem !important",
                          paddingBottom: "8px",
                          paddingLeft: 4,
                        },
                        "& .MuiList-root": {
                          paddingBottom: "8px",
                        },
                      }}
                    ></Collapse>
                  </>
                ) : (
                  <></>
                )}
                {idx !== length - 1 ? <Divider /> : <></>}
              </React.Fragment>
            );
          })}
          <Divider />
          {/* 管理员菜单 */}
          {isAdmin && isLoggedIn && (
            <>
              {adminMenuItems.map(
                (item, index) =>
                  item.show && (
                    <ListItemButton
                      key={index}
                      onClick={() =>
                        item.onClick
                          ? item.onClick()
                          : navigate(item.path || "")
                      }
                      selected={location.pathname === item.path}
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "rgba(0, 0, 0, 0.08)",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.12)",
                          },
                        },
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  )
              )}
              <Divider />
            </>
          )}

          {/* 用户菜单 */}
          {isLoggedIn && (
            <>
              {userMenuItems.map(
                (item, index) =>
                  item.show && (
                    <ListItemButton
                      key={index}
                      onClick={() =>
                        item.onClick
                          ? item.onClick()
                          : navigate(item.path || "")
                      }
                      selected={location.pathname === item.path}
                      sx={{
                        "&.Mui-selected": {
                          backgroundColor: "rgba(0, 0, 0, 0.08)",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.12)",
                          },
                        },
                      }}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  )
              )}
              <Divider />
            </>
          )}

          {/* 认证菜单 */}
          {authMenuItems.map(
            (item, index) =>
              item.show && (
                <ListItemButton
                  key={index}
                  onClick={() =>
                    item.onClick ? item.onClick() : navigate(item.path || "")
                  }
                  selected={location.pathname === item.path}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.12)",
                      },
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              )
          )}
        </List>
      </MoreStyleDrawer>

      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
      >
        <DialogTitle>确认登出</DialogTitle>
        <DialogContent>确定要退出登录吗？</DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)}>取消</Button>
          <Button onClick={handleLogout} color="primary" variant="contained">
            确认
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          登出成功！
        </Alert>
      </Snackbar>
    </>
  );
};

export default memo(Menu);
