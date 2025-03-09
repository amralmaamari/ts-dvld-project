import React, {
  createContext,
  JSX,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { IUsers } from "../../data/listUsers";
import ReactTabsComponent from "../ui/ReactTabsComponent";
import { EnMode } from "../../interfaces/constant";
import CtrlPersonCardWithFilter from "../people/controls/CtrlPersonCardWithFilter";
import { IPerson } from "../../data/listPeople";
import { usersIcons } from "../../assets/assets";
import TitleWithIcon from "../ui/TitleWithIcon";
import InputField from "../ui/InputField";
import { peopleActions, usersActions } from "../../lib/actions";

// I Stopped in Number One Here
// --------------------
// 🌟 1️⃣ Context and Reducer Definitions
// --------------------

// Define the initial structure of the form state
interface IValues {
  personInfo: IPerson | undefined;
  userId: number;
  userName: string;
  password: string;
  confirmPassword: string;
  isActive: boolean;
  mode: EnMode;
  onClose: (() => void) | null;
  isPersonSelected?: boolean;
}

// Define action types for the reducer
type IAction =
  | { type: "SET_PERSON"; payload: IPerson }
  | {
      type: "SET_USER";
      payload: { userId: number; userName: string; isActive: boolean };
    }
  | { type: "UPDATE_FIELD"; field: string; value: any }
  | { type: "RESET_FORM" };

// Define the context interface
interface IFormContext {
  state: IValues;
  dispatch: React.Dispatch<IAction>;
}

// Create FormContext
const FormContext = createContext<IFormContext | undefined>(undefined);

// Custom hook to safely use the FormContext
function useFormContext(): IFormContext {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error(
      "useFormContext must be used within a FormContext.Provider"
    );
  }
  return context;
}

// --------------------
// 🌟 2️⃣ Main Component
// --------------------

interface IAddUpdateUsersProps {
  userInfo?: IUsers;
  userId?: number;
  onDataBack?: (userId: number) => void;
  onClose?: () => void;
}

export default function AddUpdateUsers({
  userId,
  onDataBack,
  onClose,
}: IAddUpdateUsersProps): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const initialState = getInitialState(userId);
  const [state, dispatch] = useReducer(formReducer, initialState);
  useEffect(() => {
    if (!userId) return;
    const loadUserInfo = async (): Promise<void> => {
      if (!userId) {
        setError("No valid Id provided.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // ✅ First fetch drivingLicenseData
        const userData = await usersActions.fetchUserInfoById(userId);

        // ✅ Check if drivingLicenseData is valid before fetching basicInfoData
        if (!userData || !userData.UserID) {
          throw new Error("Application not found.");
        }

        // ✅ Now fetch basicInfoData using the valid ApplicationID
        const personData = await peopleActions.fetchPersonById(
          userData.PersonID
        );

        // ✅ Check if basicInfoData is valid
        if (!personData) {
          throw new Error("Basic application info not found.");
        }

        // ✅ Update states with retrieved data
        dispatch({ type: "SET_PERSON", payload: personData });

        dispatch({
          type: "SET_USER",
          payload: {
            userId: userData.UserID,
            userName: userData.UserName,
            isActive: userData.IsActive,
          },
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    loadUserInfo();
  }, [userId]);

  if (error) {
    return (
      <>
        <h2>Error will fetch the data {error}</h2>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <h2>Loading fetch the data </h2>
      </>
    );
  }

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <LicenseApplicationTabs mode={state.mode} />
    </FormContext.Provider>
  );
}

// --------------------
// 🌟 3️⃣ Helper Functions
// --------------------

function getInitialState(userId?: number): IValues {
  return {
    personInfo: undefined, // Stores user data
    userId: userId || -1,
    userName: "",
    password: "",
    confirmPassword: "",
    isActive: false,
    mode: EnMode.Create,
    onClose: null,
  };
}
// Reducer Function
function formReducer(state: IValues, action: IAction): IValues {
  switch (action.type) {
    case "SET_PERSON":
      //here i have to put after the personFound take the PersonId and check if have username by the api if already exsist not allow otherwise allow and chnage the userId
      return { ...state, personInfo: action.payload, isPersonSelected: true };

    case "SET_USER":
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.userName,
        isActive: action.payload.isActive,
        mode: EnMode.Update,
      };
    case "UPDATE_FIELD":
      return { ...state, [action.field]: action.value };

    case "RESET_FORM":
      return getInitialState(); // Reset to initial state

    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return state;
  }
}

// --------------------
// 🌟 4️⃣ UI Components
// --------------------
// Tabs Component

function LicenseApplicationTabs({ mode }: EnMode): JSX.Element {
  const tabsConfig = [
    { id: 1, label: "PersonInfo", component: <PersonSelection /> },
    { id: 2, label: "LoginInfo", component: <ApplicationDetails /> },
  ];
  return (
    <>
      <h2 className="text-red-700 text-3xl font-bold text-center mb-3">
        {mode} New User
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
      onPersonSelected={(personInfo: IPerson) =>
        dispatch({ type: "SET_PERSON", payload: personInfo })
      }
    />
  );
}

// --------------------
// 🌟 6️⃣ Application Details Component
// --------------------

function ApplicationDetails(): JSX.Element {
  const { state, dispatch } = useFormContext();

  // 🔹 Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const isFormValid = (): boolean =>
    Boolean(
      state.personInfo?.PersonID && // Ensure a person is selected
        state.userName && // Ensure username is not empty
        state.password && // Ensure password is not empty
        state.confirmPassword && // Ensure confirm password is not empty
        state.password && // Ensure no password error
        state.confirmPassword === state.password // Ensure no confirm password error
    );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ✅ Corrected typo
    dispatch({
      type: "SET_USER",
      payload: { userId: state.userId, userName: "Amr", isActive: true },
    });
    alert("Okay");
  };

  return (
    <fieldset className="p-4 border-dashed border">
      <form className="" onSubmit={handleSubmit}>
        <div className="flex flex-wrap items-center gap-2">
          <TitleWithIcon title="Uesr Id" icon={usersIcons.User322} />
          <span className="font-semibold text-red-800">
            {state.userId ?? "[Not Available]"}
          </span>
        </div>
        {LoginInfoField.map((field) => (
          <div key={field.name} className="flex flex-col mp-4">
            <InputField
              {...field}
              value={state[field.name as keyof IValues]} // 🔹 Now correctly linked to state
              onChange={handleChange}
            />
            {field.name === "confirmPassword" && state.confirmPasswordError && (
              <span className="text-red-600 text-sm">
                {state.confirmPasswordError}
              </span>
            )}
          </div>
        ))}
        <div className="flex  flex-wrap items-center gap-2 mt-3">
          <input
            id="isActive"
            className="w-fit font-semibold text-red-300 "
            type="checkbox"
            style={{
              width: "20px",
              height: "20px",
              accentColor: "red",
              cursor: "pointer",
            }}
            checked={state.isActive}
            onChange={() =>
              dispatch({
                type: "UPDATE_FIELD",
                field: "isActive",
                value: !state.isActive,
              })
            }
          />
          <label htmlFor="isActive">Is Active</label>
        </div>
        <button
          className={`${
            isFormValid() ? "cursor-pointer bg-slate-700" : "cursor-not-allowed"
          } font-bold text-2xl bg-slate-300 text-white mt-3 w-full p-3`}
          disabled={!isFormValid()}
        >
          Submit
        </button>
      </form>
    </fieldset>
  );
}

// --------------------
// 🌟 8️⃣ Application Field Component
// --------------------

// --------------------
// Application Fields Array
// --------------------

const LoginInfoField = [
  {
    name: "userName",
    type: "text",
    placeholder: "Username",
    label: "Username",
    errorMessage:
      "Username should be 3-16 characters and shouldn't include any special character!",
    required: true,
    pattern: "^[a-zA-Z0-9]{3,16}$", // 🔹 Updated regex to allow alphanumeric only
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
    label: "Password",
    errorMessage:
      "Password must be 6-16 characters, including letters & numbers!",
    required: true,
    pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,16}$", // 🔹 Now requires at least one letter and one number
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
    label: "Confirm Password",
    errorMessage: "Passwords must match!",
    required: true,
    pattern: ".*", // 🔹 Will validate in `handleChange` instead of regex
  },
];
