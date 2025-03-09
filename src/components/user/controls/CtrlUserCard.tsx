import  { JSX } from 'react'
import { IUsers } from '../../../data/listUsers'
import { usersIcons } from '../../../assets/assets'
import { ILable } from '../../../interfaces/constant';
import TitleWithIcon from '../../ui/TitleWithIcon';

export interface IValues {
  userID: number;
  userName: string;
  isActive: string;
}

export interface ICtrlUserCard {
  userData: IUsers|null; // ✅ Pass Person Data Directly
}
export default function CtrlUserCard({ userData }: ICtrlUserCard): JSX.Element {
  if (!userData) {
    return <h2 className="text-gray-600">No user data available.</h2>; // ✅ Prevent rendering if null
  }
  

  const values: IValues = {
    userID: userData?.UserID ,
    userName: userData.UserName ,
    isActive: userData.IsActive == 1 ? "Yes" : "No",
  };

    // Array of person details to render dynamically
    const uersDetailArray: ILable[] = [
      { key: "userID", label: "User ID:", icon: usersIcons.User322 },
      { key: "userName", label: "Username:", icon: usersIcons.User322 },
      { key: "isActive", label: "Is Active:", icon: usersIcons.User322 },
    ];
  return (
    <div>
      <fieldset className="border-4 border-gray-300 border-dashed p-4 rounded-xl">
        <legend className="text-xl font-semibold text-gray-700">
        Login Information
        </legend>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {uersDetailArray.map((detail, index) => (
            <UsersDetailItem
              key={index}
              label={detail.label}
              value={values[detail.key]}
              icon={detail.icon}
            />
          ))}
        </div>
      </fieldset>
    </div>
  )

  interface IUsersDetailItem {
    label: string;
    value: string;
    icon: string;
  }
  function UsersDetailItem({
    label,
    value,
    icon,
  }: IUsersDetailItem): JSX.Element {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <TitleWithIcon title={label} icon={icon} />
        <span className="font-semibold text-red-800">{value}</span>
      </div>
    );
  }


}

