import  {
    useState,
    useEffect,
    useRef,
    ChangeEvent,
    KeyboardEvent,
    JSX,
  } from 'react';
  import { peopleActions } from '../../../lib/actions';
  import CtrlPersonCard from './CtrlPerosnCard';
  import { searchIcons } from '../../../assets/assets';
  import { IPerson } from '../../../data/people';
  
  interface ICtrlPersonCardWithFilterProps {
    personId?: number;
    onPersonSelected?: (personId: number) => void;
    showAddPerson?: boolean;
    filterEnable?: boolean;
  }
  
  // Define the filter options as a union type
  type FilterOption = 'PersonID' | 'NationalNo';
  
  const SEARCH_OPTIONS = [
    { id: 'PersonID', name: 'Person ID' },
    { id: 'NationalNo', name: 'National No' },
  ];
  
  export default function CtrlPersonCardWithFilter({
    personId,
    onPersonSelected,
    showAddPerson = true,
    filterEnable = true,
  }: ICtrlPersonCardWithFilterProps): JSX.Element {
    // Local state for filtering
    const [filterBy, setFilterBy] = useState<FilterOption>('PersonID');
    const [filterValue, setFilterValue] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [person, setPerson] = useState<IPerson | null>(null);
    const [isFilterActive, setIsFilterActive] = useState<boolean>(filterEnable);
    // (Optional) state to control Add New Person modal visibility
    const [showAddModal, setShowAddModal] = useState<boolean>(showAddPerson);
  
    const inputRef = useRef<HTMLInputElement>(null);
  
    // Focus the input whenever the filter type changes
    useEffect(() => {
      inputRef.current?.focus();
    }, [filterBy]);
  
    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        loadPersonInfo();
      }
      // If filtering by PersonID, allow only numbers
      if (filterBy === 'PersonID' && e.key.length === 1 && !/[0-9]/.test(e.key)) {
        e.preventDefault();
        setError("Should Enter Only Number");
      }
    };
  
    const handleFilterByChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const selected = e.target.value as FilterOption;
      setFilterBy(selected);
      setFilterValue('');
      setError('');
    };
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFilterValue(e.target.value);
      setError('');
    };
  
    // Fetch person info based on filter criteria
    const loadPersonInfo = async (): Promise<void> => {
      const trimmedValue = filterValue.trim();
      if (!trimmedValue) {
        setError('Enter Value!');
        return;
      }
      try {
        let fetchedPerson: IPerson | null = null;
        if (filterBy === 'PersonID') {
          fetchedPerson = await peopleActions.fetchPersonById(
            parseInt(trimmedValue, 10)
          );
        } else {
          fetchedPerson = await peopleActions.fetchPersonByNationalNo(trimmedValue);
        }
        if (!fetchedPerson) {
          setError('Person not found.');
          setPerson(null);
        } else {
          setPerson(fetchedPerson);
          setIsFilterActive(false);
          if (onPersonSelected) {
            onPersonSelected(fetchedPerson.PersonID);
          }
        }
      } catch (err: any) {
        setError(err.message || 'Error fetching person info.');
        setPerson(null);
      }
    };
  
    return (
      <>
        <fieldset className="border-4 border-gray-300 border-dashed p-4 rounded-xl">
          <legend className="text-xl font-semibold text-gray-700">Filter</legend>
          <div className="flex flex-wrap items-center gap-3">
            <label className="font-bold">Find By:</label>
            <select
              value={filterBy}
              disabled={!isFilterActive}
              onChange={handleFilterByChange}
              className="border-4 bg-slate-400 text-white flex-1 p-1 outline-none"
            >
              <option value="" disabled>
                Select an option
              </option>
              {SEARCH_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
  
            <input
              ref={inputRef}
              type="text"
              disabled={!isFilterActive}
              onKeyUp={handleKeyPress}
              value={filterValue}
              onChange={handleInputChange}
              placeholder="Enter search value"
              className="border-4 border-gray-300 outline-none rounded-sm p-1 flex-1"
            />
            {error && <span className="text-red-600 font-bold">{error}</span>}
  
            <button
              className="p-2 bg-slate-300 rounded-full"
              onClick={loadPersonInfo}
              disabled={!isFilterActive}
            >
              <img src={searchIcons.SearchPerson} alt="Search" />
            </button>
  
            {/* Optionally, you can integrate a modal for adding new persons */}
          </div>
        </fieldset>
  
        {/* Display the Person Card if a person is found */}
        <CtrlPersonCard personID={person?.PersonID} />
      </>
    );
  }
  