import { EnType } from "../../interfaces/constant";
import  ViewModel  from "../../models/ViewModel";
import CtrlPersonCard from "../people/controls/CtrlPerosnCard";
import { useNavigate, useParams } from "react-router-dom";
export default function ShowPersonInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) return <p>Loading...</p>;
  const onhandleClose = () => {
    navigate("/people/list");
  };
  return (
    <>
      {
        <ViewModel
            type={EnType.View}
            modelEnabledClick={true}
            enableShowBtn={false}
            onClose={onhandleClose}
            form={<CtrlPersonCard personID={id} />}
        />
      }
    </>
  );
}
