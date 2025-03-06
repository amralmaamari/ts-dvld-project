import { JSX, useEffect, useState } from "react";
import InputField from "../../ui/InputField.js";
import { IField } from "../../../interfaces/constant.js";
import { IListApplicationType } from "../../../data/listApplicationTypes.js";
import { applicationTypeActions } from "../../../lib/actions.js";

interface IApplicationTypeFields{
  values:IListApplicationType,
  onChange: (field: keyof IApplicationTypeFields, value: string) => void;
}

function ApplicationTypeFields({ values, onChange }:IApplicationTypeFields):JSX.Element {
  const fields:IField[] = [
    {
      name: "ApplicationTypeTitle",
      type: "text",
      placeholder: "Title",
      label: "Title",
      errorMessage:
        "Title should be 3-30 characters and should not include special characters!",
      required: true,
      pattern: "^[a-zA-Z0-9.,'()\\-\\s]{3,30}$",
    },
    {
      name: "ApplicationFees",
      type: "number",
      placeholder: "Fees",
      label: "Fees",
      errorMessage: "Fees should be a valid number greater than 0!",
      required: true,
      min: 1,
    },
  ];

  return (
    <div className="flex flex-wrap items-start gap-3 my-3">
      {fields.map((field) => (
        <InputField
          label={field.name}        
          key={field.name}
          {...field}
          value={values[field.name as keyof IListApplicationType] || ""}
          onChange={(e) => onChange(field.name as keyof IApplicationTypeFields, e.target.value)}
        />
      ))}
    </div>
  );
}

interface IEditApplicationTypeProps{
  applicationTypeID:number,
}

export default function EditApplicationType({ applicationTypeID }:IEditApplicationTypeProps):JSX.Element {
  const DEFAULT_VALUE = "";
  const [values, setValues] = useState<IListApplicationType>({
    ApplicationTypeID: -1,
    ApplicationTypeTitle: DEFAULT_VALUE,
    ApplicationFees: -1,
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!applicationTypeID) return;

    const fetchApplicationTypeById = async () => {
      try {
        setLoading(true);
        const data = await applicationTypeActions.fetchApplicationTypeById(
          applicationTypeID
        );
        console.log(data);
        
        if (data) {
          setValues({
            ApplicationTypeID: data.ApplicationTypeID ,
            ApplicationTypeTitle: data.ApplicationTypeTitle ,
            ApplicationFees: data.ApplicationFees ,
          });
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Application type:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationTypeById();
  }, [applicationTypeID]);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      `Data Submitted Successfully. ApplicationTypeID: ${values.ApplicationTypeID}`
    );
  };

  const handleChange = (field: keyof IListApplicationType, value:string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!applicationTypeID) {
    return (
      <h2 className="text-center text-red-700 text-2xl font-bold">
        No Application Type ID Provided
      </h2>
    );
  }

  return (
    <div className="p-4">
      {loading ? (
        <h2 className="text-center text-blue-700 text-2xl font-bold">
          Loading...
        </h2>
      ) : (
        <>
          <h2 className="text-red-700 text-3xl font-bold text-center">
            Update Test Type
          </h2>

          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl mb-3">ID: {applicationTypeID}</h2>
            <ApplicationTypeFields values={values} onChange={handleChange} />
            <button className="bg-blue-600 text-white p-3 w-full font-bold text-2xl">
              Update
            </button>
          </form>
        </>
      )}
    </div>
  );
}
