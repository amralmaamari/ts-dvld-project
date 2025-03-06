import { JSX, useMemo } from 'react';
import { usersIcons, genderIcons } from '../../../assets/assets';
import AddUpdateModal from '../../../models/AddUpdateModal';
import { EnType } from '../../../interfaces/constant';
import AddUpdatePeople from '../AddUpdatePeople';
import TitleWithIcon from '../../ui/TitleWithIcon';
import { IPerson } from '../../../data/listPeople';

// Interface for the local person details state
export interface IPersonDetails {
  personID: number;
  nationalNo: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  nationality: string;
  phone: string;
  email: string;
  address: string;
  imagePath?: string | null;
}

// Props for the main component
export interface ICtrlPersonCardProps {
  personData: IPerson | null; // ✅ Pass Person Data Directly
  showTitle?: boolean;
}

// Props for each detail item component
export interface IPersonDetailItemProps {
  label: string;
  value: string | number | undefined | null;
  icon: string;
}

export default function CtrlPersonCard({ personData, showTitle = true }: ICtrlPersonCardProps): JSX.Element {
  const DEFAULT_VALUE = "[????]";

  // ✅ Compute the full name dynamically
  const generateFullName: string = useMemo(() => {
    return (
      [
        personData?.FirstName,
        personData?.SecondName,
        personData?.ThirdName,
        personData?.LastName,
      ]
        .filter(Boolean)
        .join(" ") || DEFAULT_VALUE
    );
  }, [personData]);

  // ✅ Construct person details object dynamically
  const personDetails: IPersonDetails = {
    personID: personData?.PersonID ?? -1,
    fullName: generateFullName,
    nationalNo: personData?.NationalNo || DEFAULT_VALUE,
    gender: personData?.Gendor || DEFAULT_VALUE,
    email: personData?.Email || DEFAULT_VALUE,
    address: personData?.Address || DEFAULT_VALUE,
    dateOfBirth: personData?.DateOfBirth || DEFAULT_VALUE,
    phone: personData?.Phone || DEFAULT_VALUE,
    nationality: personData?.Nationality || DEFAULT_VALUE,
    imagePath: personData?.ImagePath || null,
  };

  // ✅ UI Rendering
  return (
    <div>
      {showTitle && (
        <h2 className="text-red-600 text-3xl text-center font-bold">
          Person Details
        </h2>
      )}

      <fieldset className="border-4 border-gray-300 border-dashed p-4 rounded-xl">
        <legend className="text-xl font-semibold text-gray-700">
          Person Information
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {personDetailArray.map((detail, index) => (
            <PersonDetailItem
              key={index}
              label={detail.label}
              value={personDetails[detail.key]}
              icon={detail.icon}
            />
          ))}
        </div>

        {/* ✅ Update Link (opens modal for updating person info) */}
        {personData && (
          <AddUpdateModal type={EnType.Update} children={<AddUpdatePeople personInfo={personData} />} />
        )}

        {/* ✅ Image Preview Box */}
        <div className="w-40 h-40 border-2 border-dashed border-gray-400 flex items-center justify-center mt-4">
          <img
            src={personDetails.imagePath || getDefaultImage(personDetails.gender)}
            alt="Person"
            className="w-full h-full object-contain"
          />
        </div>
      </fieldset>
    </div>
  );
}

function PersonDetailItem({
  label,
  value,
  icon,
}: IPersonDetailItemProps): JSX.Element {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <TitleWithIcon title={label} icon={icon} />
      <span className="font-semibold text-red-800">{value}</span>
    </div>
  );
}
// ✅ Function to Get Default Image Based on Gender
const getDefaultImage = (gender: string): string => {
  const lowerGender = gender.toLowerCase();
  if (lowerGender === "male") return genderIcons.Male512;
  if (lowerGender === "female") return genderIcons.Female512;
  return genderIcons.Male512;
};

// Interface for each detail item in the array
export interface IPersonDetailArrayItem {
  key: keyof IPersonDetails;
  label: string;
  icon: string;
}

// Array of person details to render dynamically
const personDetailArray: IPersonDetailArrayItem[] = [
  { key: "personID", label: "Person ID:", icon: usersIcons.User322 },
  { key: "fullName", label: "Name:", icon: usersIcons.User322 },
  { key: "nationalNo", label: "National No:", icon: usersIcons.User322 },
  { key: "dateOfBirth", label: "Date Of Birth:", icon: usersIcons.User322 },
  { key: "gender", label: "Gender:", icon: usersIcons.User322 },
  { key: "phone", label: "Phone:", icon: usersIcons.User322 },
  { key: "nationality", label: "Country:", icon: usersIcons.User322 },
  { key: "email", label: "Email:", icon: usersIcons.User322 },
  { key: "address", label: "Address:", icon: usersIcons.User322 },
];
