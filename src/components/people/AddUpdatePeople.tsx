import { JSX, useCallback, useEffect, useState } from "react";
import { assets, usersIcons, genderIcons } from "../../assets/assets.js";
import { CountriesData, ICountry } from "../../data/countries.js";
import { peopleActions } from "../../lib/actions.js";
import InputField from "../ui/InputField.js";
import TitleWithIcon from "../ui/TitleWithIcon.js";
import Button from "../ui/Button.js";
import { IPerson } from "../../data/people.js";
import { EnType } from "../../interfaces/constant.js";
import SelectField from "../ui/SelectField.js";

interface IAddUpdatePeopleProps{
  personInfo?:IPerson,
  personId?:number,
  onDataBack?:(personId:number)=>void,
  onClose?:()=>void,
}

interface IValues{
  person_id: number,
  first_name: string,
  second_name: string,
  third_name: string,
  last_name: string,
  national_no: string,
  gender: string,
  email: string,
  address: string,
  date_of_birth: string,
  country: string,
  phone: string,
  image_link: string |null,
}
interface IInputGroupProps{
  label:string,
  icon:string,
  children:JSX.Element;
}
interface IFieldsProps{
  values:IValues,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}



function InputGroup({ label, icon, children }:IInputGroupProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <TitleWithIcon title={label} icon={icon} />
      {children}
    </div>
  );
}



function NameFields({ values, onChange }:IFieldsProps) {
  const PeopleField = [
    {
      name: "first_name",
      type: "text",
      placeholder: "Firstname",
      label: "First",
      errorMessage:
        "Firstname should be 3-16 characters and shouldn't include any special character!",
      required: true,
      pattern: "^[\\p{L}\\p{N}]{3,16}$",
    },
    {
      name: "second_name",
      type: "text",
      placeholder: "Secondname",
      label: "Second",
      errorMessage:
        "Secondname should be 3-16 characters and shouldn't include any special character!",

      pattern: "^[\\p{L}\\p{N}]{3,16}$",
    },
    {
      name: "third_name",
      type: "text",
      placeholder: "Thirdname",
      label: "Third",
      errorMessage:
        "Thirdname should be 3-16 characters and shouldn't include any special character!",

      pattern: "^[\\p{L}\\p{N}]{3,16}$",
    },
    {
      name: "last_name",
      type: "text",
      placeholder: "Lastname",
      label: "Last",
      errorMessage:
        "Lastname should be 3-16 characters and shouldn't include any special character!",
      required: true,
      pattern: "^[\\p{L}\\p{N}]{3,16}$",
    },
  ];
  return (
    <>
      <div className="flex flex-wrap items-start   gap-1 my-3">
        <TitleWithIcon title="Name :" icon={usersIcons.User322} />

        {/* Name */}
        <div className="grid grid-cols-auto-fill gap-2 w-full">
          {PeopleField.map((field) => (
            <InputField
              key={field.name}
              {...field}
              value={values[field.name]}
              onChange={onChange}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function NationalField({ values, onChange }:IFieldsProps):JSX.Element {
  const nationalField = {
    name: "national_no",
    type: "text",
    placeholder: "NationalNo",
    errorMessage:
      "nationalNo should be 3-16 characters and shouldn't include any special character!",
    required: true,
    pattern: "^[\\p{L}\\p{N}]{3,16}$",
  };

  return (
    <>
      <div className="flex flex-wrap items-start gap-3">
        <TitleWithIcon title="National No :" icon={usersIcons.User322} />
        <InputField
          key={nationalField.name}
          {...nationalField}
          value={values.national_no}
          onChange={onChange}
        />
      </div>
    </>
  );
}

function DOBField({ values, onChange }:IFieldsProps):JSX.Element {
  const dobField = {
    name: "date_of_birth",
    type: "date",
    placeholder: "Date Of Birth",
    errorMessage: "Date Of Birth should not be empty",
    required: true,
    pattern: "^\\d{4}-\\d{2}-\\d{2}$",
    min: "1900-01-01",
    max: "2025-01-01",
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <TitleWithIcon title="Date Of Birth :" icon={usersIcons.User322} />
        <InputField
          key={dobField.name}
          {...dobField}
          value={values.date_of_birth}
          onChange={onChange}
        />
      </div>
    </>
  );
}

function GenderRadio({ values, onChange }:IFieldsProps):JSX.Element {
  return (
    <div className=" border-4 border-primary p-2 rounded-sm">
      <InputGroup label="Gender" icon={usersIcons.User322}>
        <div className="flex gap-3">
          <div className="flex items-center gap-3">
            <label htmlFor="male">Male</label>
            <input
              className="w-fit cursor-pointer"
              type="radio"
              id="male"
              name="gender"
              value="Male"
              required
              checked={values.gender === "Male"}
              onChange={onChange}
            />
          </div>
          <div className="flex items-center gap-3 ">
            <label htmlFor="female">Female</label>
            <input
              className="w-fit cursor-pointer"
              type="radio"
              id="female"
              name="gender"
              value="Female"
              required
              checked={values.gender === "Female"}
              onChange={onChange}
            />
          </div>
        </div>
      </InputGroup>
    </div>
  );
}

function PhoneField({ values, onChange }:IFieldsProps):JSX.Element {
  const phoneField = {
    name: "phone",
    type: "tel",
    placeholder: "Phone No",
    errorMessage:
      "Phone number should be between 6 to 11 digits and contain only numbers!",
    required: true,
    pattern: "^[0-9]{6,11}$",
  };

  return (
    <>
      <div className="flex flex-wrap items-start gap-3">
        <TitleWithIcon title="Phone No :" icon={usersIcons.User322} />
        <InputField
          key={phoneField.name}
          {...phoneField}
          value={values.phone}
          onChange={onChange}
        />
      </div>
    </>
  );
}

function EmailField({ values, onChange }:IFieldsProps):JSX.Element {
  const emailField = {
    name: "email",
    type: "email",
    placeholder: "Enter your email",
    errorMessage: "Please enter a valid email address!",
    required: true,
    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", // Proper email regex
  };

  return (
    <>
      <div className="flex flex-wrap items-start gap-3">
        <TitleWithIcon title="Email :" icon={usersIcons.User322} />
        <InputField
          value={values.email}
          onChange={onChange}
          key={emailField.name}
          {...emailField}
        />
      </div>
    </>
  );
}

function AddressField({ values, onChange  }:IFieldsProps):JSX.Element {
  const addressField = {
    name: "address",
    placeholder: "Enter your Address",
    errorMessage: "Please enter a valid  address!",
    required: true,
    className: "w-full h-24 p-2 border border-gray-300 rounded", // Better styling
    pattern: "^[\\p{L}\\p{N}]{3,}$", // Allows letters, numbers, spaces, and common address symbols
  };

  const { name, required, ...addressInput } = addressField;
  return (
    <div className="flex-1">
      <div className=" flex flex-wrap items-start gap-3 ">
        <TitleWithIcon title="Address :" icon={usersIcons.User322} />
        <textarea
          id={name}
          name={name}
          required={required}
          {...addressInput}
          value={values.address}
          onChange={onChange}
        ></textarea>
      </div>
    </div>
  );
}

interface IImageUploadPreviewProps {
  values: IValues;
  onChange: (newValues: IValues) => void;
}
function ImageUploadPreview({ values, onChange }:IImageUploadPreviewProps):JSX.Element {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onChange({ ...values, image_link: imageUrl }); // Pass the updated values
    }
  };

  const handleImageRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onChange({ ...values, image_link: null });
  };

  return (
    <div className="w-fit flex   flex-row items-center gap-4">
      {/* File Input */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="image"
          className="bg-success px-4 py-2 text-base cursor-pointer hover:bg-green-700 text-white flex items-center justify-center gap-2 font-medium rounded-lg focus:outline-none transition-all duration-200"
        >
          Choose Iamge
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <Button
          text="Remove Image"
          variant="danger"
          disabled={!values.image_link}
          onClick={handleImageRemove}
        />
      </div>

      {/* Image Preview Box */}
      <div className="w-40 h-40 border-2 border-dashed border-gray-400 flex items-center justify-center">
        {values.image_link ? (
          <img
            src={values.image_link}
            alt="Preview"
            className="w-full h-full object-contain"
          />
        ) : (
          <img
            src={
              values.gender === "Male"
                ? genderIcons.Male512
                : values.gender === "Female"
                ? genderIcons.Female512
                : genderIcons.Male512
            }
            alt="Preview"
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  );
}


export default function AddUpdatePeople({
  personInfo,
  personId,
  onDataBack,
  onClose,
}:IAddUpdatePeopleProps):JSX.Element {
  const [data, setData] = useState<IPerson | null>(null);
  const [type, setType] = useState<EnType>(EnType.Create);

  const fetchPersonById = async () => {
    const data = await peopleActions.fetchPersonById(personId);
    if (data) {
      setData(data);
    }
  };
  useEffect(() => {
    if (personInfo) {
      setData(personInfo);
      setType(EnType.Update);
      return;
    }

    if (personId) {
      fetchPersonById();
      setType(EnType.Update);

      return;
    }
  }, [personInfo, personId]);

  const DEFAULT_VALUE = "";


  const [values, setValues] = useState<IValues>({
    person_id: -1,
    first_name: DEFAULT_VALUE,
    second_name: DEFAULT_VALUE,
    third_name: DEFAULT_VALUE,
    last_name: DEFAULT_VALUE,
    national_no: DEFAULT_VALUE,
    gender: DEFAULT_VALUE,
    email: DEFAULT_VALUE,
    address: DEFAULT_VALUE,
    date_of_birth: DEFAULT_VALUE,
    country: DEFAULT_VALUE,
    phone: DEFAULT_VALUE,
    image_link: DEFAULT_VALUE,
  });

  useEffect(() => {
    if (personId || personInfo)
      if (data && type === "Update") {
        setValues({
          person_id: data.PersonID ,
          first_name: data.FirstName || "",
          second_name: data.SecondName || "",
          third_name: data.ThirdName || "",
          last_name: data.LastName || "",
          national_no: data.NationalNo || "",
          date_of_birth: data.DateOfBirth || "", // Ensure it's a valid date format
          gender: data.Gendor || "",
          phone: data.Phone || "",
          email: data.Email || "",
          country: data.Nationality || "",
          image_link: data.ImagePath || "",
          address: data.Address || "",
        });
      }
  }, [data]);

  
  const actionMap = {
    Create: (personData: IPerson) => peopleActions.createPerson(personData),
    Update: (personData: IPerson) => peopleActions.updatePerson(personData),
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const respons = actionMap[type]?.(values);
    if (respons === -1) {
      alert("Error");
    } else {
      console.log(values);
      
      //this will change in real project
      if (onDataBack) onDataBack(values.person_id);
    }
  };

  const handleChange = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);


  return (
    <div className="p-3 overflow-auto">
      <h1 className="text-3xl font-bold">
        {type === "Create" ? "Add New Person" : "Update Person"}
      </h1>

      {/* Person ID */}
      <div className="flex items-center ">
        <InputGroup label="Person ID :" icon={assets.Person32}>
          <h2 className="font-extrabold">
            {type === "Create" ? "???" : values?.person_id}
          </h2>
        </InputGroup>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Info Person */}

        <NameFields values={values} onChange={handleChange} />

        <DOBField values={values} onChange={handleChange} />
        <NationalField values={values} onChange={handleChange} />

        <PhoneField values={values} onChange={handleChange} />

        <EmailField values={values} onChange={handleChange} />

        <div className="flex justify-between flex-col md:flex-row flex-wrap gap-3 my-3">
          <GenderRadio values={values} onChange={handleChange} />
          
          <SelectField<ICountry>
            label="Country"
            name="country"
            value={values.country}
            icon={usersIcons.User322}
            options={CountriesData}
            nameOfValue="country"
            nameOfLabel="country"
            onChange={(e) =>
            setValues((prev) => ({ ...prev, country: e.target.value }))
            }          
          />
        </div>

        <div className="flex flex-col md:flex-row flex-wrap gap-3 my-3">
          <AddressField values={values} onChange={handleChange} />
          <ImageUploadPreview values={values}   onChange={(newValues) => setValues(newValues)}
 />
        </div>
        
        <button className={`w-full ${EnType.Create === type ?"bg-green-500":"bg-blue-600"} p-2 text-white font-bold`}  >{type}</button>
      </form>
    </div>
  );
}


