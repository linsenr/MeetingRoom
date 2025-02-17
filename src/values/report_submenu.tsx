import { Feature } from "../../enums/features";
import { MenuItemVM } from "../../types/viewmodels/menuitemvm.type";

export const ReportSubMenuItem: MenuItemVM[] = [
  {
    display: "Grant Increment Report",
    itemKey: Feature.GrandIncreamentReport,
    icon: <></>,
    weight: 1,
  },
  {
    display: "Posting Report",
    itemKey: Feature.PostingReport,
    icon: <></>,
    weight: 2,
  },
  {
    display: "Seniority Rating Report",
    itemKey: Feature.SeniorityRatingReport,
    icon: <></>,
    weight: 3,
  },
  {
    display: "Overall Performance of Past 10 Years",
    itemKey: Feature.OverallPerformance,
    icon: <></>,
    weight: 4,
  },
  {
    display: "DP Account Deletion List",
    itemKey: Feature.DPAccDeletionList,
    icon: <></>,
    weight: 5,
  },
];
