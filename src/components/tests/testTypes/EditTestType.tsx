import React, { JSX, useEffect, useState } from "react";
import InputField from "../../ui/InputField.js";
import { testTypeActions } from "../../../lib/actions.js";
import { IListTestTypeRow } from "../../../data/listTestTypes.js";

interface ITestTypeFields{
  values:IListTestTypeRow;
  onChange:(field: keyof ITestTypeFields, value:string)=>void;
}
function TestTypeFields({ values, onChange }:ITestTypeFields) {
  const fields = [
    {
      name: "TestTypeTitle",
      type: "text",
      placeholder: "Title",
      label: "Title",
      errorMessage:
        "Title should be 3-30 characters and should not include special characters!",
      required: true,
      pattern: "^[a-zA-Z0-9.,'()\\-\\s]{3,30}$",
    },
    {
      name: "TestTypeDescription",
      type: "text",
      placeholder: "Description",
      label: "Description",
      errorMessage: "Description should be at least 3 characters!",
      required: true,
      pattern: "^[a-zA-Z0-9.,'()\\-\\s]{3,}$",
    },
    {
      name: "TestTypeFees",
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
          key={field.name}
          {...field}
          value={values[field.name as keyof IListTestTypeRow] }
          onChange={(e) => onChange(field.name  as keyof ITestTypeFields, e.target.value)}
        />
      ))}
    </div>
  );
}

interface IEditTestTypeProps{
  testTypeID:number,
}

export default function EditTestType({ testTypeID }:IEditTestTypeProps):JSX.Element {
  const DEFAULT_VALUE = "";
  const [values, setValues] = useState({
    TestTypeID: -1,
    TestTypeTitle: DEFAULT_VALUE,
    TestTypeDescription: DEFAULT_VALUE,
    TestTypeFees: -1,
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!testTypeID) return;

    const fetchTestTypeById = async () => {
      try {
        setLoading(true);
        const data = await testTypeActions.fetchTestTypeById(testTypeID);
        if (data) {
          setValues({
            TestTypeID: data.TestTypeID ,
            TestTypeTitle: data.TestTypeTitle || DEFAULT_VALUE,
            TestTypeDescription: data.TestTypeDescription || DEFAULT_VALUE,
            TestTypeFees: data.TestTypeFees ,
          });
        }
      } catch (error) {
        console.error("Error fetching test type:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestTypeById();
  }, [testTypeID]);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Data Submitted Successfully. TestTypeID: ${values.TestTypeID}`);
  };

  const handleChange = (field: keyof IListTestTypeRow, value:string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ✅ **If no `testTypeID`, don't render anything**
  if (!testTypeID) {
    return (
      <h2 className="text-center text-red-700 text-2xl font-bold">
        No Test Type ID Provided
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
            <h2 className="text-2xl mb-3">ID: {testTypeID}</h2>
            <TestTypeFields values={values} onChange={handleChange} />
            <button className="bg-blue-600 text-white p-3 w-full font-bold text-2xl">
              Update
            </button>
          </form>
        </>
      )}
    </div>
  );
}
