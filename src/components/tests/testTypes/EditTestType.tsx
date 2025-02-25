import { useEffect, useState } from "react";
import InputField from "../../../../../vite-dvld-project/src/components/InputField.jsx";
import { testTypeActions } from "../../../../../vite-dvld-project/src/lib/actions.js";

function TestTypeFields({ values, onChange }) {
  const fields = [
    {
      name: "title",
      type: "text",
      placeholder: "Title",
      label: "Title",
      errorMessage:
        "Title should be 3-30 characters and should not include special characters!",
      required: true,
      pattern: "^[a-zA-Z0-9.,'()\\-\\s]{3,30}$",
    },
    {
      name: "description",
      type: "text",
      placeholder: "Description",
      label: "Description",
      errorMessage: "Description should be at least 3 characters!",
      required: true,
      pattern: "^[a-zA-Z0-9.,'()\\-\\s]{3,}$",
    },
    {
      name: "fees",
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
          value={values[field.name] || ""}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      ))}
    </div>
  );
}

export default function EditTestType({ testTypeID }) {
  const DEFAULT_VALUE = "";
  const [values, setValues] = useState({
    testTypeID: DEFAULT_VALUE,
    title: DEFAULT_VALUE,
    description: DEFAULT_VALUE,
    fees: DEFAULT_VALUE,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!testTypeID) return;

    const fetchTestTypeById = async () => {
      try {
        setLoading(true);
        const data = await testTypeActions.fetchTestTypeById(testTypeID);
        if (data) {
          setValues({
            testTypeID: data.TestTypeID || DEFAULT_VALUE,
            title: data.TestTypeTitle || DEFAULT_VALUE,
            description: data.TestTypeDescription || DEFAULT_VALUE,
            fees: data.TestTypeFees || DEFAULT_VALUE,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Data Submitted Successfully. TestTypeID: ${values.testTypeID}`);
  };

  const handleChange = (field, value) => {
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
