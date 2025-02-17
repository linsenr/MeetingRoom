import {
  Collapse,
  CSSObject,
  Divider,
  Drawer,
  List,
  styled,
  Theme,
} from "@mui/material";
import React, { useContext } from "react";
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
import { LoggedInUserContext } from "../../../contexts/LoggedInUserContext";
import { StylingConsts } from "../../../values/styling.consts";
import Routes from "../../../values/routeconsts";
import { RouteMappings } from "../../../values/routemappings";
import { useNavigate } from "react-router-dom";
import { iterate } from "localforage";

export type MenuProps = {};

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

  //states
  const [selectedItemKey, setSelectedMenuItemKey] = React.useState<Feature>();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(true);
  const [isCollapseListOpen, setCollapseListOpen] =
    React.useState<boolean>(false);
  const [sysIsCollapseListOpen, setSysCollapseListOpen] =
    React.useState<boolean>(false);
  //handlers
  const handleMenuItemClick = (featKey: any) => {
    navigate(`${Routes.Home}/${RouteMappings[featKey].path}`);
  };

  return (
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
                  >
                    <List component="div" disablePadding dense>
                      {CurrentReportsItems.map(
                        (subItm: any, innerIndex: number) => {
                          return (
                            <MenuItem
                              key={`feat-menu-report-${innerIndex}`}
                              display={subItm.display}
                              uid={subItm.itemKey}
                              isSelected={selectedItemKey === subItm.itemKey}
                              onClick={() => {
                                setSelectedMenuItemKey(subItm.itemKey);
                                handleMenuItemClick(subItm.itemKey);
                              }}
                              isDrawerOpening={isDrawerOpen}
                            />
                          );
                        }
                      )}
                    </List>
                  </Collapse>
                </>
              ) : (
                <></>
              )}
              {itm.itemKey === Feature.CommonHome ? (
                <>
                  <MenuItem
                    display={itm.display}
                    uid={itm.itemKey}
                    icon={itm.icon}
                    endIcon={
                      sysIsCollapseListOpen ? <ExpandLess /> : <ExpandMore />
                    }
                    isDrawerOpening={isDrawerOpen}
                    isSelected={false}
                    onClick={() => {
                      setSysCollapseListOpen(!sysIsCollapseListOpen);
                    }}
                  />
                  <Collapse
                    in={sysIsCollapseListOpen}
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
                  >
                    <List component="div" disablePadding dense>
                      {CurrentSystemItems.map(
                        (subItm: any, innerIndex: number) => {
                          return (
                            <MenuItem
                              key={`feat-menu-report-${innerIndex}`}
                              display={subItm.display}
                              uid={subItm.itemKey}
                              isSelected={selectedItemKey === subItm.itemKey}
                              onClick={() => {
                                setSelectedMenuItemKey(subItm.itemKey);
                                handleMenuItemClick(subItm.itemKey);
                              }}
                              isDrawerOpening={isDrawerOpen}
                            />
                          );
                        }
                      )}
                    </List>
                  </Collapse>
                </>
              ) : (
                <></>
              )}
              {itm.itemKey !== Feature.CommonHome &&
              itm.itemKey !== Feature.CommonHome ? (
                <MenuItem
                  isSelected={selectedItemKey === itm.itemKey}
                  display={itm.display}
                  uid={itm.itemKey}
                  icon={itm.icon}
                  isDrawerOpening={isDrawerOpen}
                  onClick={() => {
                    setSelectedMenuItemKey(itm.itemKey);
                    handleMenuItemClick(itm.itemKey);
                  }}
                />
              ) : (
                <></>
              )}
              {idx !== length - 1 ? <Divider /> : <></>}
            </React.Fragment>
          );
        })}
        <Divider />
        {/* <MenuItem
            display={UICONSTANTS.menuitem_signout}
            uid={Feature.SignOut}
            icon={<LogoutIcon />}
            isSelected={false}
            isDrawerOpening={isDrawerOpen}
            onClick={() => {
              auth.signOut();
            }}
          /> */}
      </List>
    </MoreStyleDrawer>
  );
};

export default memo(Menu);
