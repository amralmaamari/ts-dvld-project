import { useState, lazy, Suspense, JSX } from "react";
import { formModel } from "../assets/assets";
import { peopleActions } from "../lib/actions";
import { EnType } from "../interfaces/constant";
// const AddUpdatePeople = lazy(() => import("../People/AddUpdatePeople"));

const deleteActionMap: Record<string,(id:number)=> void> = {
  People: (id:number) => peopleActions.deletePerson(id),
};

const DialogDictionry: Record<
string,
(id: number, type: string) => JSX.Element
> ={
  // People: (id:number, type:string) => <AddUpdatePeople personId={id} type={type} />,
};


interface IFormModalProps{
  tablename:string,
  type:EnType,
  id?:number,

}
export default function FormModal({ tablename, type, id }:IFormModalProps):JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  const handleDeleteButton = () => {
    console.log(tablename);

    if (deleteActionMap[tablename]) {
      deleteActionMap[tablename](id); // Call the function
    } else {
      console.warn(`No delete action found for table: ${tablename}`);
    }
    setOpen(false);
  };

  const Form = ():JSX.Element | null => {
    return (
      <>
        {type === EnType.Delete && id ? (
          <div>
            <h2 className="font-semibold text-[25px] my-3">
              Are Sure Whant To Delete This Recored?
            </h2>
            <button
              onClick={handleDeleteButton}
              className="w-full bg-red-700 text-white text-xl font-bold p-2 rounded-sm my-2"
            >
              Delete
            </button>
          </div>
        ) : type === EnType.Create || (type === EnType.Update && id) ? (
          <div>
            <Suspense fallback={<h1>Loading...</h1>}>
              {DialogDictionry[tablename] ? (
                DialogDictionry[tablename](id, type)
              ) : (
                <p>Invalid Form</p>
              )}
            </Suspense>
          </div>
        ) : null}
      </>
    );
  };
  const BackgroundColor = ():string => {
    return type === "Create"
      ? "bg-green-100"
      : type === "Update"
      ? "bg-blue-100"
      : "bg-red-100";
  };
  return (
    <div>
      <button
        title={type}
        className={`p-2 ${BackgroundColor()} w-fit cursor-pointer rounded-full `}
        onClick={() => setOpen(true)}
      >
        <img
          src={formModel[type]}
          alt={`${type} Icon`}
          width={30}
          height={30}
        />
      </button>

      {open && (
        <div className="w-screen h-screen fixed top-0 left-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="relative w-[70%] h-[80%]  overflow-auto md:w-[60%] xl:w[50%] bg-white  p-3 rounded-md">
            {/* <h2 className="font-semibold text-[17px]">{`${Tablename} Table (${Type})`}</h2> */}
            <button
              className="p-1 bg-red-500 w-fit cursor-pointer rounded-full absolute top-1 right-1"
              onClick={() => setOpen(false)}
            >
              <img
                src={formModel.Close}
                alt="Close Icon"
                width={30}
                height={30}
              />
            </button>
            <Form />
          </div>
        </div>
      )}
    </div>
  );
}
