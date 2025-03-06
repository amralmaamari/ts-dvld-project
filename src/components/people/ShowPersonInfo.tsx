
import { useEffect, useState } from "react";
import CtrlPersonCard from "../people/controls/CtrlPerosnCard";
import { useNavigate, useParams } from "react-router-dom";
import { IPerson } from "../../data/listPeople";
import { peopleActions } from "../../lib/actions";
export default function ShowPersonInfo() {
  const { personID } = useParams();
  const [personInfo,setPersonInfo]=useState<IPerson|null>(null);
  const [error,setError]=useState<string|null>(null);
  const [loading,setLoading]=useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(()=>{
      const loadPerosnInfo=async ():Promise<void> =>{
        if(!personID){
          setError("No valid ID provided.");
          setLoading(false);
          return;
        }
        setLoading(true);
        setError(null);
        try {
            // ✅ Now fetch basicInfoData using the valid ApplicationID
                const personData = await peopleActions.fetchPersonById(parseInt(personID));
          
                // ✅ Check if basicInfoData is valid
                if (!personData) {
                  throw new Error("Basic application info not found.");
                }
                setPersonInfo(personData);
          
        }
        catch (err) {
          setError(err instanceof Error ? err.message : "Error fetching data");
  
        }
        finally{
          setLoading(false);
        }
      }
      loadPerosnInfo();
  },[])

  const onClickPrevious = () => {
    navigate("/people/list");
  };
  

  if(error){
    return (<><h2>Error will fetch the data {error}</h2></>)
  }
  
  if(loading){
    return (<><h2>Loading fetch the data </h2></>)
  }  
  
  return (
    <>
      {
      <CtrlPersonCard  personData={personInfo} showTitle={true} />
      }
    </>
  );
}
