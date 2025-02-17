import { Story } from "@storybook/react";
import MenuItem, { MenuItemProps } from "./MenuItem";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Feature } from "../../../enums/features";

const Template: Story<MenuItemProps> = (args) => <MenuItem {...args} />;

export default {
  component: MenuItem,
  title: "MenuItem",
};

const onClickHandler = (key: Feature) => {
    console.log(key);
}

export const Default = Template.bind({});
Default.args = {
  display: "menu button 1",
  icon: <PersonOutlineIcon />,
  uid: Feature.AnalysisReports,
  onClick: onClickHandler
};

export const Selected = Template.bind({});
Selected.args = {
  display: "menu button 1",
  icon: <PersonOutlineIcon />,
  uid: Feature.AppealRatings,
  onClick: onClickHandler,
  isSelected: true
};
