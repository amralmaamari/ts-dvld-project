import { JSX, useEffect, useState } from "react";
import CtrlPersonCard from "../people/controls/CtrlPerosnCard";
import CtrlUserCard from "./controls/CtrlUserCard";
import { IUsers } from "../../data/listUsers";
import { IPerson } from "../../data/listPeople";
import { peopleActions, usersActions } from "../../lib/actions";
import InputField from "../ui/InputField";

interface IValues {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface IChangePassword {
    userID: number;
}
export default function ChangePassword({ userID }: IChangePassword): JSX.Element {
    const [users, setUsers] = useState<IUsers | null>(null);
    const [person, setPerson] = useState<IPerson | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    const [values, setValues] = useState<IValues>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    useEffect(() => {
        const loadUserInfo = async (): Promise<void> => {
            if (!userID) {
                setError("No valid ID provided.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                // ✅ First fetch drivingLicenseData
                const userData = await usersActions.fetchUserInfoById(userID);
                console.log(userData);

                // ✅ Check if drivingLicenseData is valid before fetching basicInfoData
                if (!userData || !userData.UserID) {
                    throw new Error("Application not found.");
                }

                // ✅ Now fetch basicInfoData using the valid ApplicationID
                const personData = await peopleActions.fetchPersonById(userData.PersonID);

                // ✅ Check if basicInfoData is valid
                if (!personData) {
                    throw new Error("Basic application info not found.");
                }

                // ✅ Update states with retrieved data

                setUsers(userData);
                setPerson(personData);



            } catch (err) {
                setError(err instanceof Error ? err.message : "Error fetching data");

            }
            finally {
                setLoading(false);
            }
        };

        loadUserInfo();
    }, [userID]);

    if (error) {
        return (<><h2>Error will fetch the data {error}</h2></>)
    }

    if (loading) {
        return (<><h2>Loading fetch the data </h2></>)
    }

    const isFormValid = (): boolean =>
        Boolean(
            values.currentPassword.length >= 6 &&
            values.newPassword.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/) &&
            values.confirmPassword === values.newPassword
        );



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({
            ...prev, // ✅ Keep previous values
            [e.target.name]: e.target.value, // ✅ Update only the changed field
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Password Updated Successfully!");
    };

    return (
        <>
            <CtrlPersonCard personData={person} showTitle={false} />
            <CtrlUserCard userData={users} />
            
            {/* ✅ Password Update Form */}
            <form className="mt-3" onSubmit={handleSubmit}>
            <fieldset className="border-4 border-gray-300 border-dashed p-4 rounded-xl">
            
                {passwordsField.map((field) => (
                    <div key={field.name} className="flex flex-col mp-4">
                        <InputField {...field} value={values[field.name as keyof typeof values]} onChange={handleChange} />
                    </div>
                ))}
                </fieldset>
                <button
                    className={`${isFormValid() ? "cursor-pointer bg-slate-700" : "cursor-not-allowed"
                        } font-bold text-2xl bg-slate-300 text-white mt-3 w-full p-3`}
                    disabled={!isFormValid()}
                >
                    Submit
                </button>
        </form>
        </>
    )
}

const passwordsField = [
    {
        name: "currentPassword",
        type: "password",
        placeholder: "Current Password",
        label: "Current Password",
        errorMessage: "Password should be 6-16 characters, including letters & numbers.",
        required: true,
        pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,16}$", // Ensures at least one letter and one number
    },
    {
        name: "newPassword",
        type: "password",
        placeholder: "New Password",
        label: "New Password",
        errorMessage: "Password should be 8-20 characters, including at least one letter, one number, and one special character.",
        required: true,
        pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$", // Stronger password rule
    },
    {
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm Password",
        label: "Confirm Password",
        errorMessage: "Passwords must match and follow the new password format.",
        required: true,
        pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$", // Same as `newPassword`
    },
];
