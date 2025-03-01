import React, {
  ChangeEvent,
  JSX,
  useRef,
  useState,
} from "react";
import { ISearchOptions } from "../../interfaces/constant";

interface ISearchComponentProps {
  searchOptions?: ISearchOptions[];
  onSearchChange: (value: string) => void;
  onColumnChange: (value: string) => void;
  setCurrentPage: (page: number) => void;
}

export default function SearchComponent({
  searchOptions = [],
  onSearchChange,
  onColumnChange,
  setCurrentPage,
}: ISearchComponentProps): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isTextInputVisible, setIsTextInputVisible] = useState<boolean>(true);
  const [filteredOptions, setFilteredOptions] = useState<
    { accessor: string; header: string }[] | null
  >(null);

  // Retrieves nested options based on the dataType.
  const getNestedOptions = (
    optionName: string
  ): { accessor: string; header: string }[] => {
    const found = searchOptions.find((opt) => opt.dataType === optionName);
    return found && found.options ? found.options : [];
  };

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedType = selectedOption.dataset.type;

    onColumnChange(e.target.value);
    console.log("Selected column:", e.target.value);

    onSearchChange(""); // Clear search input

    if (selectedType) {
      setIsTextInputVisible(false);
      setFilteredOptions(getNestedOptions(selectedType));
    } else {
      setIsTextInputVisible(true);
      setFilteredOptions(null);
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.value = ""; // Clear UI input
      }
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("Search text:", e.target.value);
    onSearchChange(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 align-middle mb-3">
      <SearchSelect options={searchOptions} onChange={handleOptionChange} />

      <div className="w-full max-w-[400px]">
        {isTextInputVisible ? (
          <TextInput onChange={handleSearchChange} inputRef={inputRef} />
        ) : (
          <NestedSelect
            options={filteredOptions || []}
            onChange={handleSearchChange}
          />
        )}
      </div>
    </div>
  );
}

/** Search Select Dropdown */
interface ISearchSelectProps {
  options: ISearchOptions[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function SearchSelect({ options, onChange }: ISearchSelectProps): JSX.Element {
  return (
    <div className="relative inline-block w-64">
      <select
        id="options"
        name="options"
        onChange={onChange}
        className="block w-full px-4 py-3 cursor-pointer text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((opt) => (
          <option
            key={opt.accessor}
            value={opt.accessor}
            data-type={opt.dataType}
          >
            {opt.header}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Text Input */
interface ITextInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

function TextInput({ onChange, inputRef }: ITextInputProps): JSX.Element {
  return (
    <input
      type="text"
      onChange={onChange}
      ref={inputRef}
      placeholder="Search"
      className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-500 text-[20px] font-medium text-gray-700"
    />
  );
}

/** Nested Select Dropdown */
interface INestedSelectProps {
  options: { accessor: string; header: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function NestedSelect({ options, onChange }: INestedSelectProps): JSX.Element {
  return (
    <select
      id="nestedOption"
      name="nestedOption"
      onChange={onChange}
      className="block w-full px-4 py-3 cursor-pointer text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="" disabled>
        Select an option
      </option>
      {options.map((opt) => (
        <option key={opt.accessor} value={opt.accessor}>
          {opt.header}
        </option>
      ))}
    </select>
  );
}
