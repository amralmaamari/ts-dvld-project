import  { JSX } from 'react'

interface ItitleWithIcon{
    title:string,
    icon:string,
}
export default function TitleWithIcon({title,icon}:ItitleWithIcon):JSX.Element {
  return (
    
    <div className="flex  items-center gap-3 mb-1">
      <h2 className="text-1xl">{title}</h2>
      <img src={icon} alt="" />
    </div>
  )
}
