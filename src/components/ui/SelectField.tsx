import React, { JSX } from "react";
import TitleWithIcon from "./TitleWithIcon"; // adjust import as needed

// The generic type T must have an "id" property for a unique key.
export interface ISelectFieldProps<T extends { id: number | string }> {
  label: string;
  icon: string;
  name: string;
  value: string;
  options: T[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // Optional: keys to pick the option value and label. Default to "value" and "label"
  nameOfValue?: keyof T;
  nameOfLabel?: keyof T;
}

export default function SelectField<T extends { id: number | string }>({
  label,
  icon,
  name,
  value,
  options,
  onChange,
  nameOfValue = "value" as keyof T,
  nameOfLabel = "label" as keyof T,
}: ISelectFieldProps<T>): JSX.Element {
  return (
    <>
    <TitleWithIcon title={label} icon={icon} />
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="border-4 bg-primary text-white cursor-pointer flex-1 p-1 outline-none"
      >
        {options.map((option) => (
          <option
            key={option.id}
            value={option[nameOfValue] as unknown as string}
          >
            {option[nameOfLabel] as unknown as string}
          </option>
        ))}
      </select>
      </>
  );
}
