import React, { JSX, useState } from "react";
import { formModel } from "../assets/assets";

// Define allowed action types
type ActionType = "Close" | "Create" | "Delete" | "Update" | "View";

// Use PascalCase for interface names and camelCase for prop names
export interface IViewModelProps {
  enableShowBtn: boolean;
  type: ActionType;
  modelEnabledClick: boolean;
  form: React.ReactNode;
  onClose?: () => void;
}

export default function ViewModel({
  enableShowBtn,
  type,
  modelEnabledClick,
  form,
  onClose,
}: IViewModelProps): JSX.Element {
  // Initialize state; note that modal is open if the button is not enabled
  const [open, setOpen] = useState<boolean>(!enableShowBtn);

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose(); // Call the parent's onClose callback
    }
  };

  return (
    <div>
      {enableShowBtn && (
        <button
          title="View"
          className={`p-2 bg-sky-300 w-fit ${
            modelEnabledClick ? "cursor-pointer" : ""
          } rounded-full`}
          onClick={() => setOpen(true)}
          disabled={!modelEnabledClick}
        >
          <img
            src={formModel[type]}
            alt="View Icon"
            width={30}
            height={30}
          />
        </button>
      )}

      {open && (
        <div className="w-screen h-screen fixed top-0 left-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative w-[70%] h-[80%] overflow-auto md:w-[60%]  bg-white p-3 rounded-md">
            <button
              className="p-1 bg-red-500 w-fit cursor-pointer rounded-full absolute top-1 right-1"
              onClick={handleClose}
            >
              <img
                src={formModel.Close}
                alt="Close Icon"
                width={30}
                height={30}
              />
            </button>
            <div className="mt-9">{form}</div>
          </div>
        </div>
      )}
    </div>
  );
}
