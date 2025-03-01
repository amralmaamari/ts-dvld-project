import { InputHTMLAttributes, JSX, useState } from "react";
import "./InputField.css";
interface IinputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}
export default function InputField({label, errorMessage, onChange, ...inputProps}:IinputFieldProps):JSX.Element {
  const [focused, setfocused] = useState(false);
  return (
    <div className="flex w-full items-start flex-col ">
      <label>{label}</label>
      <input
        {...inputProps}
        onBlur={() => setfocused(true)}
        onChange={onChange}
        focused={focused.toString()}
      />
      <span className="hidden text-red-600">{errorMessage}</span>
    </div>
  );
}
