import { JSX } from "react";
import { usersIcons } from "../../../assets/assets";
import TitleWithIcon from "../../ui/TitleWithIcon";
import { IApplicationBasicInfo } from "../../../data/applicationsInfo";
import { IApplicationDetailItemProps, ILable } from "../../../interfaces/constant";

interface ICtrlApplicationBasicInfoProps {
  applicationData: IApplicationBasicInfo | null;
}

export default function CtrlApplicationBasicInfo({ applicationData }: ICtrlApplicationBasicInfoProps): JSX.Element {
  if (!applicationData) {
    return <h2>Loading application details...</h2>;
  }

  return (
    <div>
      <fieldset className="border-4 border-gray-300 border-dashed p-4 rounded-xl">
        <legend className="text-xl font-semibold text-gray-700">
          Application Basic Info
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {applicationDetailsArray.map((detail, index) => (
            <ApplicationDetailItem
              key={index}
              title={detail.label}
              value={applicationData[detail.key as keyof IApplicationBasicInfo] ?? "N/A"}
              icon={detail.icon}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function ApplicationDetailItem({ title, value, icon }: IApplicationDetailItemProps): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <TitleWithIcon title={title} icon={icon} />
      <span className="font-semibold text-red-800">{value}</span>
    </div>
  );
}

// ✅ Application Details Array
export const applicationDetailsArray: ILable[] = [
  { key: "ApplicationID", label: "ID:", icon: usersIcons.User322 },
  { key: "ApplicationStatus", label: "Status:", icon: usersIcons.User322 },
  { key: "PaidFees", label: "Fees:", icon: usersIcons.User322 },
  { key: "ApplicationTypeTitle", label: "Type:", icon: usersIcons.User322 },
  { key: "ApplicantName", label: "Applicant:", icon: usersIcons.User322 },
  { key: "ApplicationDate", label: "Date:", icon: usersIcons.User322 },
  { key: "LastStatusDate", label: "Status Date:", icon: usersIcons.User322 },
  { key: "UserName", label: "Created By:", icon: usersIcons.User322 },
];
