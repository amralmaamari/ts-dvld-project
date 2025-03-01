import { JSX, useState } from 'react'
import { EnType } from '../interfaces/constant';
import ViewModel from './ViewModel';

interface IAddUpdateModalProps{
    type:EnType,
    children?:JSX.Element,
}


export default function AddUpdateModal({type,children}:IAddUpdateModalProps):JSX.Element {
        
  return (
    <>
      {<ViewModel enableShowBtn={true} modelEnabledClick={true}  type={type} form={children} onClose={()=>console.log()} />}
        
    </>
  )
}
