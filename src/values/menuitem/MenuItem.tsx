import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { JSX, memo } from "react";
import { Feature } from "../../enums/features";
import React from "react";

export type MenuItemProps = {
  display: string;
  uid: Feature;
  icon?: JSX.Element;
  endIcon?: JSX.Element;
  isSelected: boolean;
  onClick: (key: Feature) => void;
  isDrawerOpening: boolean;
};

const MenuItem = (props: MenuItemProps) => {
  return (
    <ListItemButton
      selected={props.isSelected}
      key={`menu-item-button-f${props.uid}`}
      onClick={() => props.onClick(props.uid)}
      sx={{
        minHeight: 24,
        justifyContent: props.isDrawerOpening ? "initial" : "center",
      }}
    >
      {props.icon ? (
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: props.isDrawerOpening ? 3 : "auto",
            justifyContent: "center",
            marginRight: 1,
          }}
        >
          {props.icon}
        </ListItemIcon>
      ) : (
        <></>
      )}
      <ListItemText
        primary={props.display}
        primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
        sx={{ opacity: props.isDrawerOpening ? 1 : 0 }}
      />
      {props.endIcon}
    </ListItemButton>
  );
};

export default memo(MenuItem);
