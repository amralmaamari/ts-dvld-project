import { useState, memo, JSX } from "react";
import SidebarItem from "./SidebarItem";
import items from "./Sidebar.json";

export  interface ISidebarItem{
  id?: string | number;
  title: string;
  icon: string;
  path: string;
  children?: ISidebarItem[];
}

function Sidebar():JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const closeSidebar = () => setOpen(false);
  
  return (
    <div className="relative">
      {/* Hamburger button shown when sidebar is closed */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open Sidebar"
          className="fixed top-4 left-4 z-20 w-10 h-10 bg-slate-600 text-white rounded p-1 transition-transform hover:scale-105"
        >
          &#9776;
        </button>
      )}

      {/* Sidebar overlay that slides in/out */}
      <div
        className={`fixed top-0 left-0 z-10 w-full h-screen bg-gray-900 text-white overflow-y-auto transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close Sidebar"
            className="ml-auto mb-4 w-8 h-8 text-3xl transition-transform hover:scale-105"
          >
            &times;
          </button>
          <div className="space-y-2">
            {(items as ISidebarItem[]).map((item, index) => (
              <SidebarItem
                key={item.id || index}
                item={item}
                closeSidebar={closeSidebar}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Sidebar);
