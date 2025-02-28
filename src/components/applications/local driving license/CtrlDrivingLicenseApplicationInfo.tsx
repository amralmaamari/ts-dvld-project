import { JSX, useEffect } from "react";
import { usersIcons } from "../../../assets/assets";
import TitleWithIcon from "../../TitleWithIcon";
// import ViewModel from "../../Models/ViewModel";
// import CtrlApplicationBasicInfo from "../Controls/CtrlApplicationBasicInfo";


interface ICtrlDrivingLicenseApplicationInfoProps{
  localDrivingLicenseApplicationID?:number,
  applicationID?:number,
}
export default function CtrlDrivingLicenseApplicationInfo({
  localDrivingLicenseApplicationID,
  applicationID,
}:ICtrlDrivingLicenseApplicationInfoProps):JSX.Element {

   useEffect(() => {
      if (!applicationID && !localDrivingLicenseApplicationID) return;
      loadDriApplicationInfo();
    }, [applicationID,localDrivingLicenseApplicationID]);
  return (
    <div>
      <h3>Here  is something remmning</h3>
      <CtrlApplicationBasicInfo applicationID={applicationID} />
    </div>
  );
}

interface IApplicationDetailItemProps{
  title:string;
  value:string;
  icon:string;
}
function ApplicationDetailItem({ title, value, icon }:IApplicationDetailItemProps):JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <TitleWithIcon title={title} icon={icon} />
      <span className="font-semibold text-red-800">{value}</span>
    </div>
  );
}

export const drivingLicenseDetailsArray = [
  {
    key: "drivingLicenseApplicationID",
    label: "Driving License App ID:",
    icon: usersIcons.User322,
  },
  {
    key: "appliedLicenseType",
    label: "Applied License Type:",
    icon: usersIcons.User322,
  },
  { key: "passedTestCount", label: "Passed Tests:", icon: usersIcons.User322 },
];
