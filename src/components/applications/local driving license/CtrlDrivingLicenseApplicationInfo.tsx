import { JSX, useEffect, useState } from "react";
import { usersIcons } from "../../../assets/assets";
import TitleWithIcon from "../../ui/TitleWithIcon";
import { IApplicationDetailItemProps, ILable } from "../../../interfaces/constant";
import CtrlApplicationBasicInfo from "../controls/CtrlApplicationBasicInfo";
import { applicationsActions, drivingLicenseApplicationInfoActions } from "../../../lib/actions";
import { IApplicationBasicInfo } from "../../../data/applicationsInfo";

interface IValues {
  localDrivingLicenseApplicationID: number;
  applicationID: number;
  licenseClassID: number;
  passedTests: number;
}

interface ICtrlDrivingLicenseApplicationInfoProps {
  localDrivingLicenseApplicationID?: number;
  applicationID?: number;
}


export default function CtrlDrivingLicenseApplicationInfo({
  localDrivingLicenseApplicationID,
  applicationID,
}: ICtrlDrivingLicenseApplicationInfoProps): JSX.Element {
  
  const [values, setValues] = useState<IValues | null>(null);
  const [error,setError]=useState<string|null>(null);
  const [loading,setLoading]=useState<boolean>(false);
  const [basicInfo, setBasicInfo] = useState<IApplicationBasicInfo | null>(null);

  useEffect(() => {
    const loadDrivingLicenseApplicationInfo = async (): Promise<void> => {
      if (!localDrivingLicenseApplicationID && !applicationID) {
        setError("No valid ID provided.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
 // ✅ First fetch drivingLicenseData
      const drivingLicenseData = localDrivingLicenseApplicationID
      ? await drivingLicenseApplicationInfoActions.fetchDrivingLicenseApplicationInfoById(localDrivingLicenseApplicationID)
      : await drivingLicenseApplicationInfoActions.fetchDrivingLicenseApplicationInfoByApplicationId(applicationID);

      // ✅ Check if drivingLicenseData is valid before fetching basicInfoData
      if (!drivingLicenseData || !drivingLicenseData.ApplicationID) {
      throw new Error("Application not found.");
      }

         
          // ✅ Now fetch basicInfoData using the valid ApplicationID
      const basicInfoData = await applicationsActions.fetchApplicationById(drivingLicenseData.ApplicationID);

      // ✅ Check if basicInfoData is valid
      if (!basicInfoData) {
        throw new Error("Basic application info not found.");
      }

      // ✅ Update states with retrieved data
      setValues({
        localDrivingLicenseApplicationID: drivingLicenseData.LocalDrivingLicenseApplicationID,
        applicationID: drivingLicenseData.ApplicationID,
        licenseClassID: drivingLicenseData.LicenseClassID,
        passedTests: drivingLicenseData.PassedTest,
      });

      setBasicInfo(basicInfoData);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching data");

      }
      finally{
        setLoading(false);
      }
    };

    loadDrivingLicenseApplicationInfo();
  }, [localDrivingLicenseApplicationID, applicationID]);

    if(error){
      return (<><h2>Error will fetch the data {error}</h2></>)
    }
    
    if(loading){
      return (<><h2>Loading fetch the data </h2></>)
    }
  return (
    <div>
      <fieldset className="border-4 border-gray-300 border-dashed p-4 rounded-xl">
        <legend className="text-xl font-semibold text-gray-700">
          Driving License Application Info
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {values && drivingLicenseDetailsArray.map((detail, index) => (
            <ApplicationDetailItem
              key={index}
              title={detail.label}
              value={values?.[detail.key as keyof IValues] ?? "N/A"}
              icon={detail.icon}
            />
          ))}
        </div>
      </fieldset>

      <CtrlApplicationBasicInfo applicationData ={basicInfo} />
    </div>
  );
}

function ApplicationDetailItem({ title, value, icon }: IApplicationDetailItemProps): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <TitleWithIcon title={title} icon={icon} />
      <span className="font-semibold text-red-800">
        {title === "Passed Tests:" ? `${value}/3` : value}
      </span>
    </div>
  );
}

const drivingLicenseDetailsArray: ILable[] = [
  {
    key: "localDrivingLicenseApplicationID",
    label: "Driving License App ID:",
    icon: usersIcons.User322,
  },
  {
    key: "licenseClassID",
    label: "Applied License Type:",
    icon: usersIcons.User322,
  },
  { key: "passedTests", label: "Passed Tests:", icon: usersIcons.User322 },
];
