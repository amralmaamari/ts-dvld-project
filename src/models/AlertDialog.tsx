import ViewModel from "./ViewModel.tsx";
import { EnType } from "../interfaces/constant.ts";
import Button from "../components/Button.tsx";
import { JSX } from "react";

interface IAlertDialogProps{
  message:string;
  onClose?:()=>void;
  onSubmit:()=>void;
}

export default function AlertDialog({message,onClose,onSubmit}:IAlertDialogProps):JSX.Element {
  const Content=()=> {
    return <>
    <h2>{message}</h2>
    <Button text="No" type="View" onClick={onClose} />
    <Button text="Yes" type="Delete" onClick={onSubmit} />
    </>
  }
  return <div>{<ViewModel enableShowBtn={true} type={EnType.View} modelEnabledClick={true} form={<Content/>} />}</div>;
}

