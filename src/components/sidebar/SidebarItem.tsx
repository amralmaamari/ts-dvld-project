import { useState, memo, JSX } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { ISidebarItem } from "./Sidebar";


interface  ISidebarItemProps{
  item:ISidebarItem,
  closeSidebar:()=>void,
}
function SidebarItem({ item,closeSidebar}:ISidebarItemProps):JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  const renderIcon = (iconName:string):JSX.Element | null => {
    const IconAsset = assets[iconName];
    if (!IconAsset) return null;
    return typeof IconAsset === "string" ? (
      <img src={IconAsset} alt={iconName} className="w-7 h-7 inline-block" />
    ) : (
      <IconAsset className="w-7 h-7 inline-block" />
    );
  };

  if (item.children && item.children.length > 0) {
    return (
      <div className="space-y-1  ">
        <div
          className="flex  justify-between items-center p-2 rounded cursor-pointer hover:bg-gray-700 transition-colors"
          onClick={() => setOpen(!open)}
        >
          <div className="flex   items-center gap-2">
            {item.icon && renderIcon(item.icon)}
            <span className="text-base font-medium">{item.title}</span>
          </div>
          <span className="text-sm transition-transform duration-150">
            {open ? "▲" : "▼"}
          </span>
        </div>
        <div
          className={`overflow-hidden pl-6  transition-all  duration-150 ${
            open ? "max-h-[1000px] mt-2" : "max-h-0"
          }`}
        >
          {item.children.map((child, index) => (
            <SidebarItem key={child.id || index} item={child} closeSidebar={closeSidebar} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      to={item.path || "#"}
      className="flex items-center gap-2 p-2 rounded hover:bg-gray-700 transition-colors text-base"
      onClick={()=>closeSidebar()}
    >
      {item.icon && renderIcon(item.icon)}
      <span>{item.title}</span>
    </Link>
  );
}

export default memo(SidebarItem);
