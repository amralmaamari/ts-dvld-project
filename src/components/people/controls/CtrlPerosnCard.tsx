import { JSX, useEffect, useMemo, useState } from 'react';
import { usersIcons, genderIcons } from '../../../assets/assets';
import { peopleActions } from '../../../lib/actions';
import { IPerson } from '../../../data/people';
import TitleWithIcon from '../../ui/TitleWithIcon';
import ViewModel from '../../../models/ViewModel';
import AddUpdateModal from '../../../models/AddUpdateModal';
import { EnType } from '../../../interfaces/constant';
import AddUpdatePeople from '../AddUpdatePeople';

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
  imagePath?: string|null;
}

// Props for the main component
export interface ICtrlPersonCardProps {
  personID?: number;
  nationalNo?: string;
  selectedPersonInfo?: (person: IPerson) => void;
  showTitle?:boolean,
}

// Props for each detail item component
export interface IPersonDetailItemProps {
  label: string;
  value: string | number | undefined | null;
  icon: string;
}

export default function CtrlPersonCard({
  personID,
  nationalNo,
  selectedPersonInfo,
  showTitle=true,
}: ICtrlPersonCardProps): JSX.Element {
  const [selectedPerson, setSelectedPerson] = useState<IPerson | null>(null);
  const DEFAULT_VALUE = "[????]";

  // Pre-defined default object for person details
  const initialPersonDetails: IPersonDetails = {
    personID: -1,
    nationalNo: DEFAULT_VALUE,
    fullName: DEFAULT_VALUE,
    gender: DEFAULT_VALUE,
    dateOfBirth: DEFAULT_VALUE,
    nationality: DEFAULT_VALUE,
    phone: DEFAULT_VALUE,
    email: DEFAULT_VALUE,
    address: DEFAULT_VALUE,
    imagePath: null,
  };

  const [personDetails, setPersonDetails] = useState<IPersonDetails>(
    initialPersonDetails
  );

  // Fetch person info using the provided identifier(s)
  const loadPersonInfo = async (): Promise<void> => {
    try {
      if (!personID && !nationalNo) {
        throw new Error("No identifier provided.");
      }
      let data: IPerson | null = null;
      if (personID) {
        data = await peopleActions.fetchPersonById(personID);
      } else {
        data = await peopleActions.fetchPersonByNationalNo(nationalNo);
      }
      if (!data) {
        throw new Error("Person not found.");
      }
      setSelectedPerson(data);
      selectedPersonInfo?.(data);
    } catch (error) {
      console.error("Error loading person info:", error);
      setSelectedPerson(null);
    }
  };

  // Generate a full name by joining available name parts
  const generateFullName: string = useMemo(() => {
    return (
      [
        selectedPerson?.FirstName,
        selectedPerson?.SecondName,
        selectedPerson?.ThirdName,
        selectedPerson?.LastName,
      ]
        .filter(Boolean)
        .join(" ") || DEFAULT_VALUE
    );
  }, [selectedPerson]);

  // Update local person details when selectedPerson changes
  useEffect(() => {
    if (selectedPerson) {
      setPersonDetails({
        personID: Number(selectedPerson.PersonID),
        fullName: generateFullName || DEFAULT_VALUE,
        nationalNo: selectedPerson.NationalNo || DEFAULT_VALUE,
        gender: selectedPerson.Gendor || DEFAULT_VALUE,
        email: selectedPerson.Email || DEFAULT_VALUE,
        address: selectedPerson.Address || DEFAULT_VALUE,
        dateOfBirth: selectedPerson.DateOfBirth || DEFAULT_VALUE,
        phone: selectedPerson.Phone || DEFAULT_VALUE,
        nationality: selectedPerson.Nationality || DEFAULT_VALUE,
        imagePath: selectedPerson.ImagePath || null,
      });
    } else {
      setPersonDetails(initialPersonDetails);
    }
  }, [selectedPerson, generateFullName]);

  // Load person info when the component mounts or when identifiers change
  useEffect(() => {
    if (!personID && !nationalNo) return;
    loadPersonInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personID, nationalNo]);

  // Detail item component defined within the main component
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

  return (
    <div>
      {showTitle &&(
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

        {/* Update Link (opens modal or view model) */}
        {selectedPerson && (
          <AddUpdateModal type={EnType.Update} children={<AddUpdatePeople personInfo={selectedPerson} />}   />
        )}

        {/* Image Preview Box */}
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
