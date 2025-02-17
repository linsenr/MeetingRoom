import { Navigate, Route, Routes } from "react-router-dom";
import { default as FeatureRoute } from "../values/routeconsts";
import {
  SpecialAppraisals,
  CreateAppraisal,
  EditAppraisal,
} from "../pages/SpecialAppraisals/";
import {
  StaffReport,
  EditProforma,
  EditOutpostMemo,
  EditReport,
  CreateBatchReport,
  AppraisalReport,
} from "../pages/StaffReport";
import { StaffAppraisalReports } from "../pages/StaffAppraisalReports";
import { PerformanceRatings } from "../pages/PerformanceRatings";
import { RouteParamKeyConsts } from "../values/uilogicdata/routeparamkey";
import {
  BookInOut,
  ViewAppraisalReport,
  ViewBookingRecord,
} from "../pages/BookInOut";
import {
  UserAdministration,
  CreateUserAdministration,
} from "../pages/UserAdministration";
import {
  RoleAdministration,
  CreateRoleAdministration,
} from "../pages/RoleAdministration";
import {
  StaffAdministration,
  CreateStaffAdministration,
} from "../pages/StaffAdministration";
import { EmailAcount, CreateEmailAcount } from "../pages/EmailAcount";
import {
  EmailAcountMapping,
  CreateEmailAcountMapping,
} from "../pages/EmailAcountMapping";
import {
  AuditRecords,
  ViewAuditRecords,
} from "../pages/AuditRecords";
import ModerationIndexPage from "../pages/Moderation/ModerationIndexPage";
import ModerationDetailPage from "../pages/Moderation/ModerationDetailPage";
import ModerationDetailComments from "../pages/Moderation/ModerationDetailComments";
import BookIn from "../pages/BookIn/BookIn";
import BookInCheck from "../pages/BookIn/BookInCheck";
import TrackAppraisalReport from "../pages/TrackAppraisalReport/TrackAppraisalReport";
import AddTrackAppraisal from "../pages/TrackAppraisalReport/AddTrackAppraisal/AddTrackAppraisal";
import Appealratings from "../pages/Appealratings/Appealratings";
import HomePages from "../pages/HomePages/Home";
import { LookUpTables, EditLookUpTables } from "../pages/LookUpTables";
import BoardMembership from "../pages/BoardMembership/BoardMembership";
import AnalysisReports from "../pages/AnalysisReports/AnalysisReports";
import ReferenceIndex from "../pages/Reference/ReferenceIndex";
import GrantIncrementReport from "../pages/Reports/GrantIncrementReport";
import PostingReport from "../pages/Reports/PostingReport";
import SeniorityRatinhReport from "../pages/Reports/SenioorityRatinhReport";
import OverallPerformanceReport from "../pages/Reports/OverallPerformanceReport";
import DPAccDeletionList from "../pages/Reports/DPAccDeletionList";
import AppraisalDatabase from "../pages/AppraisalDatabase/AppraisalDatabase";
import ViewAllBookingRecord from "../pages/BookInOut/ViewBookingRecord/ViewAllBookingRecord";
import EditReference from "../pages/Reference/EditReference";
import DocumentTemplate from "../pages/SystemParams/DocumentTemplate";
import EmailTemplate from "../pages/SystemParams/EmailTemplate";
import CreateEmailTemplate from "../pages/SystemParams/CreateEmailTemplate/CreateEmailTemplate";
import BoardMembershipTV from "../pages/BoardMembership/BoardMembershipTV";
import DataRemovalIndex from "../pages/DataRemoval/DataRemovalIndex";

const SpecialAppraisalsRoute = () => {
  return (
    <>
      <Route index={true} element={<SpecialAppraisals />} />
      <Route
        path={FeatureRoute.SpecialAppraisalsBatch_CreateAppraisal}
        element={<CreateAppraisal />}
      />
      <Route
        path={`:${RouteParamKeyConsts.specialAppraisalCode}`}
        element={<EditAppraisal />}
      />
    </>
  );
};
const StaffReportRoute = () => {
  return (
    <>
      <Route index={true} element={<StaffReport />} />
      <Route path={FeatureRoute.StaffReportsBatch_CreateReport}>
        <Route index={true} element={<CreateBatchReport />} />
        <Route path={FeatureRoute.StaffReportsBatch_PreviewReport}>
          <Route index={true} element={<EditReport />} />
          <Route path={FeatureRoute.StaffReportsBatch_AppraisalReport}>
            <Route index={true} element={<AppraisalReport />} />
            <Route
              path={`:${RouteParamKeyConsts.appraisalReportUid}`}
              element={<AppraisalReport />}
            />
          </Route>
        </Route>
      </Route>
      <Route path={`:${RouteParamKeyConsts.staffReportsBatchCode}`}>
        <Route index={true} element={<EditReport />} />
        <Route
          path={FeatureRoute.StaffReportsBatch_EditProforma}
          element={<EditProforma />}
        />
        <Route
          path={FeatureRoute.StaffReportsBatch_EditMemo}
          element={<EditOutpostMemo />}
        />
        <Route
          path={FeatureRoute.StaffReportsBatch_AppraisalReport}
          element={<AppraisalReport />}
        />
        <Route
          path={`:${RouteParamKeyConsts.appraisalReportUid}`}
          element={<AppraisalReport />}
        />
      </Route>
    </>
  );
};
const PerformanceRatingsRoute = () => {
  return (
    <>
      <Route index={true} element={<PerformanceRatings />} />
      <Route path={FeatureRoute.EformTemplate} element={<BookIn />} />
      <Route path={`:${RouteParamKeyConsts.reportId}`} element={<BookInCheck />} />
    </>
  );
};
const StaffAppraisalReportsRoute = () => {
  return (
    <>
      <Route index={true} element={<StaffAppraisalReports />} />
    </>
  );
};

const ModerationIndexPageRoute = () => {
  return (
    <>
      <Route index={true} element={<ModerationIndexPage />} />
      <Route
        path={FeatureRoute.Moderation_Detail}
        element={<ModerationDetailPage />}
      />
      <Route path={`:${RouteParamKeyConsts.moderationId}`}>
        <Route index={true} element={<ModerationDetailPage />} />
        <Route
          path={FeatureRoute.Moderation_Comments}
          element={<ModerationDetailComments />}
        />
        <Route path={FeatureRoute.EformTemplate} element={<BookIn />} />
        <Route
          path={FeatureRoute.EformTemplateCheck}
          element={<BookInCheck />}
        />
      </Route>
    </>
  );
};

const BookingRecordRoute = () => {
  return (
    <>
      <Route index={true} element={<BookInOut />} />
      <Route
        path={FeatureRoute.BookInOut_ViewRecords}
        element={<ViewBookingRecord />}
      />
      <Route
        path={FeatureRoute.BookInOut_ViewAllRecords}
        element={<ViewAllBookingRecord />}
      />
      <Route
        path={`:${RouteParamKeyConsts.appraisalReportCode}`}
        element={<ViewAppraisalReport />}
      />
    </>
  );
};

const TrackAppraisalReports = () => {
  return (
    <>
      <Route index={true} element={<TrackAppraisalReport />} />
      <Route path={`:${RouteParamKeyConsts.appraisalReportCode}`}>
        <Route index={true} element={<AddTrackAppraisal />} />
      </Route>
    </>
  );
};

const AppealRatings = () => {
  return (
    <>
      <Route index={true} element={<Appealratings />} />
    </>
  );
};

const UserAdministrationRoute = () => {
  return (
    <>
      <Route index={true} element={<UserAdministration />} />
      <Route
        path={FeatureRoute.UserAdministration_CreateUser}
        element={<CreateUserAdministration />}
      />
      <Route
        path={FeatureRoute.UserAdministration_EditUser}
        element={<EditAppraisal />}
      />
    </>
  );
};
const RoleAdministrationRoute = () => {
  return (
    <>
      <Route index={true} element={<RoleAdministration />} />
      <Route
        path={FeatureRoute.RoleAdministration_CreateRole}
        element={<CreateRoleAdministration />}
      />
      <Route
        path={FeatureRoute.UserAdministration_EditUser}
        element={<EditAppraisal />}
      />
    </>
  );
};
const StaffAdministrationRoute = () => {
  return (
    <>
      <Route index={true} element={<StaffAdministration />} />
      <Route
        path={`:${RouteParamKeyConsts.staffId}`}
        element={<CreateStaffAdministration />}
      />
    </>
  );
};
const EmailAcountRoute = () => {
  return (
    <>
      <Route index={true} element={<EmailAcount />} />
      <Route
        path={`:${RouteParamKeyConsts.emailAccountId}`}
        element={<CreateEmailAcount />}
      />
      {/* <Route
        path={FeatureRoute.EmailAcount_Edit}
        element={<CreateEmailAcount />}
      /> */}
    </>
  );
};
const EmailAcountMappingRoute = () => {
  return (
    <>
      <Route index={true} element={<EmailAcountMapping />} />
      <Route
        path={`:${RouteParamKeyConsts.emailAccountMappingId}`}
        element={<CreateEmailAcountMapping />}
      />
    </>
  );
};

const LookUpTable = () => {
  return (
    <>
      <Route index={true} element={<LookUpTables />} />
      <Route
        path={`:${RouteParamKeyConsts.lookUpId}`}
        element={<EditLookUpTables />}
      />
    </>
  );
};

const BoardMembershipRoute = () => {
  return (
    <>
      <Route index={true} element={<BoardMembership />} />
      <Route
        path={FeatureRoute.BoardMembershipAppointmentTV}
        element={<BoardMembershipTV />}
      />
    </>
  );
};
const AuditRecordsRoute = () => {
  return (
    <>
      <Route index={true} element={<AuditRecords />} />
      <Route
        path={`:${RouteParamKeyConsts.auditRecordUid}`}
        element={<ViewAuditRecords />}
      />
    </>
  );
};
const AnalysisReportsRoute = () => {
  return (
    <>
      <Route index={true} element={<AnalysisReports />} />
    </>
  );
};
const ReferenceRoute = () => {
  return (
    <>
      <Route index={true} element={<ReferenceIndex />} />
      <Route path={FeatureRoute.EditRefrence} element={<EditReference />} />
    </>
  );
};
const GrandIncreamentReportRoute = () => {
  return (
    <>
      <Route index={true} element={<GrantIncrementReport />} />
    </>
  );
};
const PostingReportRoute = () => {
  return (
    <>
      <Route index={true} element={<PostingReport />} />
    </>
  );
};
const SeniorityRatinhReportRoute = () => {
  return (
    <>
      <Route index={true} element={<SeniorityRatinhReport />} />
    </>
  );
};
const OverallPerformanceReportRoute = () => {
  return (
    <>
      <Route index={true} element={<OverallPerformanceReport />} />
    </>
  );
};
const DPAccDeletionListRoute = () => {
  return (
    <>
      <Route index={true} element={<DPAccDeletionList />} />
    </>
  );
};
const DAppraisalDatabaseRoute = () => {
  return (
    <>
      <Route index={true} element={<AppraisalDatabase />} />
    </>
  );
};

const DocumentTemplateRoute = () => {
  return (
    <>
      <Route index={true} element={<DocumentTemplate />} />
    </>
  );
};
const EmailTemplateRoute = () => {
  return (
    <>
      <Route index={true} element={<EmailTemplate />} />
      <Route
        path={`:${RouteParamKeyConsts.emailTemplateId}`}
        element={<CreateEmailTemplate />}
      />
    </>
  );
};

const DataRemoval = () => {
  return (
    <>
      <Route index={true} element={<DataRemovalIndex />} />
    </>
  );
};

export const SRSRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={FeatureRoute.Home} />} />
      <Route path={FeatureRoute.Home}>
        <Route index={true} element={<HomePages />} />
        <Route path={FeatureRoute.SpecialAppraisalsBatch}>
          {SpecialAppraisalsRoute()}
        </Route>
        <Route path={FeatureRoute.StaffReportsBatch}>
          {StaffReportRoute()}
        </Route>
        <Route path={FeatureRoute.StaffAppraisalReports}>
          {StaffAppraisalReportsRoute()}
        </Route>
        <Route path={FeatureRoute.BookInOut}>{BookingRecordRoute()}</Route>
        <Route path={FeatureRoute.PerformanceRatings}>
          {PerformanceRatingsRoute()}
        </Route>
        <Route path={FeatureRoute.Moderation}>
          {ModerationIndexPageRoute()}
        </Route>
        <Route path={FeatureRoute.TrackAppraisalReports}>
          {TrackAppraisalReports()}
        </Route>
        <Route path={FeatureRoute.AppealRatings}>{AppealRatings()}</Route>
        <Route path={FeatureRoute.UserAdministration}>
          {UserAdministrationRoute()}
        </Route>
        <Route path={FeatureRoute.Roles}>{RoleAdministrationRoute()}</Route>
        <Route path={FeatureRoute.Staff}>{StaffAdministrationRoute()}</Route>
        <Route path={FeatureRoute.EmailAcount}>{EmailAcountRoute()}</Route>
        <Route path={FeatureRoute.EmailAcountMapping}>
          {EmailAcountMappingRoute()}
        </Route>
        <Route path={FeatureRoute.LookUpTables}>{LookUpTable()}</Route>
        <Route path={FeatureRoute.BoardMembershipAppointment}>
          {BoardMembershipRoute()}
        </Route>
        <Route path={FeatureRoute.AnalysisReports}>
          {AnalysisReportsRoute()}
        </Route>
        <Route path={FeatureRoute.Reference}>{ReferenceRoute()}</Route>
        <Route path={FeatureRoute.GrantIncrementReport}>
          {GrandIncreamentReportRoute()}
        </Route>
        <Route path={FeatureRoute.PostingReport}>{PostingReportRoute()}</Route>
        <Route path={FeatureRoute.SeniorityRatinhReport}>
          {SeniorityRatinhReportRoute()}
        </Route>
        <Route path={FeatureRoute.OverallPerformanceReport}>
          {OverallPerformanceReportRoute()}
        </Route>
        <Route path={FeatureRoute.DPAccDeletionList}>
          {DPAccDeletionListRoute()}
        </Route>
        <Route path={FeatureRoute.AppraisalDatabase}>
          {DAppraisalDatabaseRoute()}
        </Route>
        <Route path={FeatureRoute.DocumentTemplate}>
          {DocumentTemplateRoute()}
        </Route>
        <Route path={FeatureRoute.EmailTemplate}>
          {EmailTemplateRoute()}
        </Route>
        <Route path={FeatureRoute.AuditRecords}>
          {AuditRecordsRoute()}
        </Route>
        <Route path={FeatureRoute.DataRemoval}>
          {DataRemoval()}
        </Route>
      </Route>
    </Routes>
  );
};

export default SRSRouter;
