import { JSX, useEffect, useState } from 'react'
import { usersActions,peopleActions } from '../../lib/actions';
import { IUsers } from '../../data/listUsers';
import { IPerson } from '../../data/listPeople';
import CtrlPersonCard from '../people/controls/CtrlPerosnCard';
import CtrlUserCard from './controls/CtrlUserCard';

interface IShowUserInfo{
  userID:number;
}
export default function ShowUserInfo({userID}:IShowUserInfo):JSX.Element {


  const [users, setUsers] = useState<IUsers | null>(null);
  const [person,setPerson]=useState<IPerson|null>(null);
  const [error,setError]=useState<string|null>(null);
  const [loading,setLoading]=useState<boolean>(false);

    useEffect(() => {
    const loadUserInfo = async (): Promise<void> => {
    if (!userID ) {
        setError("No valid ID provided.");
        setLoading(false);
        return;
    }

    setLoading(true);
    setError(null);
    try {
// ✅ First fetch drivingLicenseData
    const userData =  await usersActions.fetchUserInfoById(userID);
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
    finally{
        setLoading(false);
    }
    };
  
    loadUserInfo();
    }, [userID]);

    if(error){
        return (<><h2>Error will fetch the data {error}</h2></>)
      }
      
      if(loading){
        return (<><h2>Loading fetch the data </h2></>)
      }  
      
  return (
    <>
        <CtrlPersonCard personData={person} showTitle={false}/>
        <CtrlUserCard userData={users}/>

    </>
  )
}
