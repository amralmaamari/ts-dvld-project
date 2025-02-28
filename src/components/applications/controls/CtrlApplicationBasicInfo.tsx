import { JSX, useEffect, useState } from "react";
import { usersIcons } from "../../../assets/assets";
import { applicationsActions } from "../../../lib/actions";
import LabelWithIcon from "../../LabelWithIcon";
import ViewModel from "../../Models/ViewModel";
import CtrlPersonCard from "../../People/Controls/CtrlPersonCard";
import DateUtils from "../../../utils/DateUtils";

interface ICtrlApplicationBasicInfoProps{
  applicationID:number;
}
export default function CtrlApplicationBasicInfo({ applicationID }:ICtrlApplicationBasicInfoProps):JSX.Element {
  const DEFAULT_VALUE = "[????]";
  const [selectedApplication, setSelectedApplication] = useState(null);
  const applicationStatus = JSON.parse(import.meta.env.VITE_APPLICATION_STATUS);

  const initialApplicationDetails = {
    id: DEFAULT_VALUE,
    status: DEFAULT_VALUE,
    fees: DEFAULT_VALUE,
    type: DEFAULT_VALUE,
    applicant: DEFAULT_VALUE,
    date: DEFAULT_VALUE,
    status_date: DEFAULT_VALUE,
    created_by: DEFAULT_VALUE,
    personID: null,
  };

  const [applicationDetails, setApplicationDetails] = useState(
    initialApplicationDetails
  );

  const loadApplicationInfo = async () => {
    try {
      if (!applicationID) {
        throw new Error("No identifier provided.");
      }

      const data = await applicationsActions.fetchApplicationById(
        applicationID
      );

      if (!data) {
        throw new Error("Person not found.");
      }

      setSelectedApplication(data);
    } catch (err) {
      console.error("Error loading application info:", err.message);
      setSelectedApplication(null);
    }
  };

  useEffect(() => {
    if (selectedApplication) {
      setApplicationDetails({
        id: selectedApplication.ApplicationID || DEFAULT_VALUE,
        status:
          applicationStatus[selectedApplication.ApplicationStatus] ||
          DEFAULT_VALUE,

        fees: selectedApplication.PaidFees || DEFAULT_VALUE,
        type: selectedApplication.ApplicationTypeTitle || DEFAULT_VALUE,
        applicant: selectedApplication.ApplicantName || DEFAULT_VALUE,
        date:
          DateUtils.formatDate(selectedApplication.ApplicationDate) ||
          DEFAULT_VALUE,
        status_date:
          DateUtils.formatDate(selectedApplication.LastStatusDate) ||
          DEFAULT_VALUE,
        created_by: selectedApplication.UserName || DEFAULT_VALUE,
        personID: selectedApplication.PersonID || DEFAULT_VALUE,
      });
    } else {
      setApplicationDetails(initialApplicationDetails); // ✅ Use pre-defined default object
    }
  }, [selectedApplication]); // ✅ Dependency corrected

  useEffect(() => {
    if (!applicationID) return;
    loadApplicationInfo();
  }, [applicationID]);

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
              label={detail.label}
              value={applicationDetails[detail.key]}
              icon={detail.icon}
            />
          ))}
        </div>
        {/* Link */}
        {selectedApplication && (
          <ViewModel
            Form={<CtrlPersonCard personId={3} />}
            type="View"
            viewModelEnabled={true}
          />
        )}
      </fieldset>
    </div>
  );
}

function ApplicationDetailItem({ label, value, icon }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <LabelWithIcon label={label} icon={icon} />
      <span className="font-semibold text-red-800">{value}</span>
    </div>
  );
}

export const applicationDetailsArray = [
  { key: "id", label: "ID:", icon: usersIcons.User322 },
  { key: "status", label: "Status:", icon: usersIcons.User322 },
  { key: "fees", label: "Fees:", icon: usersIcons.User322 },
  { key: "type", label: "Type:", icon: usersIcons.User322 },
  { key: "applicant", label: "Applicant:", icon: usersIcons.User322 },
  { key: "date", label: "Date:", icon: usersIcons.User322 },
  { key: "status_date", label: "Status Date:", icon: usersIcons.User322 },
  { key: "created_by", label: "Created By:", icon: usersIcons.User322 },
];
