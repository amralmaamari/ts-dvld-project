import { useReducer, createContext, useContext, JSX } from "react";
import { Data } from "../../assets/data";
import { peopleActions } from "../../lib/actions";
import { usersIcons } from "../../assets/assets";
import CtrlPersonCardWithFilter from "../People/Controls/CtrlPersonCardWithFilter";
import LabelWithIcon from "../LabelWithIcon";
import Button from "../ui/Button";
import ReactTabsComponent from "../ReactTabsComponent";

// 🎯 Context for Form State Management
const FormContext = createContext();

// 🎯 Main Component
interface IAddUpdateLocalDrivingLicenseApplicationProps{
  localDrivingLicenseApplicationID:number;
}
export default function AddUpdateLocalDrivingLicenseApplication({
  localDrivingLicenseApplicationID,
}:IAddUpdateLocalDrivingLicenseApplicationProps):JSX.Element {
  const initialState = getInitialState(localDrivingLicenseApplicationID);
  const [state, dispatch] = useReducer(formReducer, initialState);
  // const handleClose = () => {
  //   dispatch({ type: "RESET_FORM" });

  // };

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <LicenseApplicationTabs mode={state.mode} />
    </FormContext.Provider>
  );
}

// 📌 Generate Initial State
function getInitialState(localDrivingLicenseApplicationID:number) {
  return {
    personId: null,
    applicationId: localDrivingLicenseApplicationID || "[????]",
    applicationDate: formatDate(new Date()),
    licenseClass: 3,
    applicationFees: Data.ApplicationTypes[0].ApplicationFees,
    createdBy: "Amr7022",
    mode: localDrivingLicenseApplicationID ? "Update" : "Create",
    onClose: null,
  };
}

// 📌 Reducer Function
function formReducer(state, action) {
  switch (action.type) {
    case "SET_PERSON":
      return { ...state, personId: action.payload, isPersonSelected: true };
    case "UPDATE_APPLICATION":
      return { ...state, applicationId: action.payload, mode: "Update" };
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET_FORM":
      return getInitialState();
    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
}

// 📌 Tabs Component
function LicenseApplicationTabs({ mode }) {
  const tabsConfig = [
    { id: 1, label: "Person", component: <PersonSelection />, disabled: true },
    {
      id: 2,
      label: "Application",
      component: <ApplicationDetails />,
      disabled: false,
    },
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

// 📌 Person Selection Component
function PersonSelection() {
  const { state, dispatch } = useContext(FormContext);
  console.log("Add Update ", state.person);

  return (
    <CtrlPersonCardWithFilter
      personId={state?.personId}
      onPersonSelected={(id) => dispatch({ type: "SET_PERSON", payload: id })}
    />
  );
}

// 📌 Application Details Component
function ApplicationDetails() {
  const { state, dispatch } = useContext(FormContext);

  const isFormValid = () =>
    Boolean(state?.personId && state.licenseClass && state.createdBy?.trim());

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    try {
      const response = await peopleActions.createPerson(state);
      dispatch({ type: "UPDATE_APPLICATION", payload: response });
      console.log("Application Submitted:", response);
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <fieldset className="p-4 border-dashed border">
      <h2 className="text-red-700 text-[22px] font-bold">
        Person ID : {state?.personId || "[????]"}
      </h2>
      <LicenseClassDropdown />
      {applicationFields.map(({ key, label, icon }) => (
        <ApplicationField key={key} label={label} fieldKey={key} icon={icon} />
      ))}
      <Button
        text="Save"
        disabled={!state?.personId}
        onClick={handleSubmit}
        fullWidth={true}
      >
        Submit
      </Button>
    </fieldset>
  );
}

// 📌 License Class Dropdown
function LicenseClassDropdown() {
  const { state, dispatch } = useContext(FormContext);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: "licenseClass",
      value: e.target.value,
    });
  };

  return (
    <fieldset disabled={!state.personId} className="my-3">
      <label className="font-bold">License Class:</label>
      <select
        value={state.licenseClass}
        onChange={handleChange}
        className="border-2 bg-gray-200 text-black p-2 rounded-md w-full outline-none cursor-pointer"
      >
        <option value="" disabled>
          Select an option
        </option>
        {Data.LicenseClasses.map(({ LicenseClassID, ClassName }) => (
          <option key={LicenseClassID} value={LicenseClassID}>
            {ClassName}
          </option>
        ))}
      </select>
    </fieldset>
  );
}

// 📌 Application Field Component
interface IApplicationFieldsProps{
  label:string;
  fieldKey:string;
  icon:string;
}
function ApplicationField({ label, fieldKey, icon }:IApplicationFieldsProps) {
  const { state} = useContext(FormContext);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <LabelWithIcon label={label} icon={icon} />
      <span className="font-semibold text-red-800">
        {state[fieldKey] ?? "[Not Available]"}
      </span>
    </div>
  );
}

// 📌 Application Fields Array
interface IapplicationFieldsProps{
  key:string;
  label:string;
  icon:string;
}
const applicationFields:IapplicationFieldsProps[] = [
  {
    key: "applicationId",
    label: "D.L. Application ID:",
    icon: usersIcons.User322,
  },
  {
    key: "applicationDate",
    label: "Application Date:",
    icon: usersIcons.User322,
  },
  {
    key: "applicationFees",
    label: "Application Fees:",
    icon: usersIcons.User322,
  },
  { key: "createdBy", label: "Created By:", icon: usersIcons.User322 },
];

// 📌 Helper Function to Format Date
function formatDate(date:Date):string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
