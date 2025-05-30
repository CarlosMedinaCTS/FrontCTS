import { useState } from "react";
import { Outlet } from "react-router";
import useToggle from "../../hooks/ui/useToggle";
import { colors } from "../../utils";
import Popover from "../data-display/Popover";
import Sidebar from "./Asidebar";
import Navbar from "./Navbar";
import { ColorPanel, LayoutPanel } from "./LayoutMenu";

const Layout = () => {
   const [collapsed, setCollapsed] = useState(false);
   const [color, setColor] = useState<string>(colors.obsidian);
   const [type, setType] = useState<boolean>(true);
   const { isToggled, handleToggle } = useToggle();

   return (
      <main className={`
      lg:grid
      h-screen
      overflow-hidden
      ${collapsed ? 'lg:grid-cols-[5rem_1fr]' : 'lg:grid-cols-[16rem_1fr]'}
      ${type ? 'py-2.5 pr-2.5' : ''}
   `}
         style={{ backgroundColor: color }}
      >
         <div className="lg:h-screen overflow-y-auto fixed lg:inset-0 z-50 lg:static lg:z-auto lg:block">
            <Sidebar
               collapsed={collapsed}
               setCollapsed={setCollapsed}
               color={color}
            />
         </div>

         <section className={`${type ? 'h-[98dvh] rounded-2xl' : 'h-screen'} bg-white  w-full  flex flex-col  overflow-hidden px-5`}>
            <Navbar
               onOpen={handleToggle}
            />
            <div className="flex-1 min-h-0 overflow-y-auto ">
               <Outlet />
            </div>
         </section>

         {
            isToggled &&
            <Popover
               onClose={handleToggle}
               title="Configuración"
            >
               <LayoutPanel setType={setType} />
               <ColorPanel colors={colors} setColor={setColor} />
            </Popover>
         }
      </main>
   );
};

export default Layout;