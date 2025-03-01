import  { JSX, useState } from 'react'
import { formModel } from "../assets/assets";

interface IDeleteModalProps{
    id:number,
    onConfirmDelete :()=>boolean;
}
export default function DeleteModal({id,onConfirmDelete }:IDeleteModalProps):JSX.Element {
      const [open, setOpen] = useState<boolean>(false);
    
      const handleDeleteButton = () => {
       const success= onConfirmDelete ();        
      if(success) setOpen(false);
      };
        const Form = ():JSX.Element | null => {
          return (
            <>
              {id ? (
                <div className='mt-9'>
                  <h2 className="font-semibold text-[25px] my-3">
                    Are Sure Whant To Delete This Recored {id} ?
                  </h2>
                  <button
                    onClick={handleDeleteButton}
                    className="w-full bg-red-700 text-white text-xl font-bold p-2 rounded-sm my-2"
                  >
                    Delete
                  </button>
                </div>
              ) : null}
            </>
          );
        };
  return (
    <>
    
          <button
            title={"Delete"}
            className={`p-2 bg-red-100 w-fit cursor-pointer rounded-full `}
            onClick={() => setOpen(true)}
          >
            <img
              src={formModel['Delete']}
              alt={`Delete Icon`}
              width={30}
              height={30}
            />
          </button>
          {open && (
          <div className="w-screen h-screen fixed top-0 left-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative w-[70%] h-[35%]  overflow-auto md:w-[60%] xl:w[50%] bg-white  p-3 rounded-md">
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
    </>
  )
}
