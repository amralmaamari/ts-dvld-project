import React, { useReducer, createContext, useContext, JSX, useEffect } from "react";
import { peopleActions } from "../../lib/actions";
import { usersIcons } from "../../assets/assets";
import CtrlPersonCardWithFilter from "../people/controls/CtrlPersonCardWithFilter";
import TitleWithIcon from "../ui/TitleWithIcon";
import Button from "../ui/Button";
import ReactTabsComponent from "../ui/ReactTabsComponent";
import { ListLicenseClassesData } from "../../data/listLicenseClasses";
import { ListApplicationTypesData } from "../../data/listApplicationTypes";
import { IPerson } from "../../data/listPeople";

// --------------------
// 🌟 1️⃣ Context and Reducer Definitions
// --------------------

// Define the initial structure of the form state
interface IFormState {
  personInfo: IPerson | undefined;
  applicationId: number | string;
  applicationDate: string;
  licenseClass: number;
  applicationFees: number;
  createdBy: string;
  mode: "Update" | "Create";
  onClose: (() => void) | null;
  isPersonSelected?: boolean;
  [key: string]: any; // Allow dynamic fields
}

// Define action types for the reducer
type IAction =
  | { type: "SET_PERSON"; payload: IPerson }
  | { type: "UPDATE_APPLICATION"; payload: number }
  | { type: "UPDATE_FIELD"; field: string; value: any }
  | { type: "RESET_FORM" };

// Define the context interface
interface IFormContext {
  state: IFormState;
  dispatch: React.Dispatch<IAction>;
}

// Create FormContext
const FormContext = createContext<IFormContext | undefined>(undefined);

// Custom hook to safely use the FormContext
function useFormContext(): IFormContext {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormContext.Provider");
  }
  return context;
}

// --------------------
// 🌟 2️⃣ Main Component
// --------------------

interface IAddUpdateLocalDrivingLicenseApplicationProps {
  localDrivingLicenseApplicationID?: number;
}

export default function AddUpdateLocalDrivingLicenseApplication({
  localDrivingLicenseApplicationID,
}: IAddUpdateLocalDrivingLicenseApplicationProps): JSX.Element {
  
  const initialState = getInitialState(localDrivingLicenseApplicationID);
  const [state, dispatch] = useReducer(formReducer, initialState);

  useEffect(() => {
    console.log("Fetching data for LocalDrivingLicenseApplicationID:", localDrivingLicenseApplicationID);
  }, [localDrivingLicenseApplicationID]);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <LicenseApplicationTabs mode={state.mode} />
    </FormContext.Provider>
  );
}

// --------------------
// 🌟 3️⃣ Helper Functions
// --------------------

// Generate Initial State
function getInitialState(localDrivingLicenseApplicationID?: number): IFormState {
  return {
    personInfo: undefined,
    applicationId: localDrivingLicenseApplicationID || "[????]",
    applicationDate: formatDate(new Date()),
    licenseClass: 3,
    applicationFees: ListApplicationTypesData.applicationTypes[0].ApplicationFees,
    createdBy: "Amr7022",
    mode: localDrivingLicenseApplicationID ? "Update" : "Create",
    onClose: null,
  };
}

// Reducer Function
function formReducer(state: IFormState, action: IAction): IFormState {
  switch (action.type) {
    case "SET_PERSON":
      return { ...state, personInfo: action.payload, isPersonSelected: true };
    case "UPDATE_APPLICATION":
      return { ...state, applicationId: action.payload, mode: "Update" };
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return getInitialState(); // Reset to initial state
    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
}

// Format Date Helper Function
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// --------------------
// 🌟 4️⃣ UI Components
// --------------------

// Tabs Component
interface ILicenseApplicationTabsProps {
  mode: "Update" | "Create";
}

function LicenseApplicationTabs({ mode }: ILicenseApplicationTabsProps): JSX.Element {
  const tabsConfig = [
    { id: 1, label: "Person", component: <PersonSelection /> },
    { id: 2, label: "Application", component: <ApplicationDetails /> },
  ];
  return (
    <>
      <h2 className="text-red-700 text-3xl font-bold text-center mb-3">
        {mode} Local Driving License Application
      </h2>
      <ReactTabsComponent tabsConfig={tabsConfig} />
    </>
  );
}

// --------------------
// 🌟 5️⃣ Person Selection Component
// --------------------

function PersonSelection(): JSX.Element {
  const { state, dispatch } = useFormContext();

  return (
    <CtrlPersonCardWithFilter
      personData={state.personInfo}
      onPersonSelected={(personInfo: IPerson) => dispatch({ type: "SET_PERSON", payload: personInfo })}
    />
  );
}

// --------------------
// 🌟 6️⃣ Application Details Component
// --------------------

function ApplicationDetails(): JSX.Element {
  const { state, dispatch } = useFormContext();

  const isFormValid = (): boolean => Boolean(state.personInfo?.PersonID && state.licenseClass && state.createdBy?.trim());

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    try {
      const response = await peopleActions.createPerson(state.personInfo);
      dispatch({ type: "UPDATE_APPLICATION", payload: response });
      console.log("Application Submitted:", response);
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <fieldset className="p-4 border-dashed border">
      <LicenseClassDropdown />
      {applicationFields.map(({ key, label, icon }) => (
        <ApplicationField key={key} label={label} fieldKey={key} icon={icon} />
      ))}
      <Button text="Submit" disabled={!state.personInfo} onClick={handleSubmit} fullWidth={true} />
    </fieldset>
  );
}

// --------------------
// 🌟 7️⃣ License Class Dropdown Component
// --------------------

function LicenseClassDropdown(): JSX.Element {
  const { state, dispatch } = useFormContext();

  return (
    <fieldset disabled={!state.personInfo} className="my-3">
      <label className="font-bold">License Class:</label>
      <select
        value={state.licenseClass}
        onChange={(e) => dispatch({ type: "UPDATE_FIELD", field: "licenseClass", value: parseInt(e.target.value, 10) })}
        className="border-2 bg-gray-200 text-black p-2 rounded-md w-full outline-none cursor-pointer"
      >
        <option value="" disabled>Select an option</option>
        {ListLicenseClassesData.licenseClasses.map(({ LicenseClassID, ClassName }) => (
          <option key={LicenseClassID} value={LicenseClassID}>
            {ClassName}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

// --------------------
// 🌟 8️⃣ Application Field Component
// --------------------

interface IApplicationFieldsProps {
  label: string;
  fieldKey: string;
  icon: string;
}

function ApplicationField({ label, fieldKey, icon }: IApplicationFieldsProps): JSX.Element {
  const { state } = useFormContext();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <TitleWithIcon title={label} icon={icon} />
      <span className="font-semibold text-red-800">{state[fieldKey] ?? "[Not Available]"}</span>
    </div>
  );
}

// --------------------
// Application Fields Array
// --------------------

const applicationFields = [
  { key: "applicationId", label: "D.L. Application ID:", icon: usersIcons.User322 },
  { key: "applicationDate", label: "Application Date:", icon: usersIcons.User322 },
  { key: "applicationFees", label: "Application Fees:", icon: usersIcons.User322 },
  { key: "createdBy", label: "Created By:", icon: usersIcons.User322 },
];
