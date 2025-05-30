import { Outlet } from "react-router";
import Sidebar from "./Asidebar";
import Navbar from "./Navbar";
import { useState } from "react";
import Popover from "../data-display/Popover";
import { colors } from "../../utils";
import useToggle from "../../hooks/ui/useToggle";
import { Typography } from "../ui/Typography";
import { BiFoodMenu } from "react-icons/bi";
import { IoIosColorFilter } from "react-icons/io";

const Layout = () => {
   const [collapsed, setCollapsed] = useState(false);
   const [color, setColor] = useState<string>(colors.obsidian);
   const [type, setType] = useState<boolean>(true); // Assuming this is used somewhere in the future
   const { isToggled, handleToggle } = useToggle();

   return (
      <main className={`
      lg:grid
      h-screen
      
      overflow-hidden
      ${collapsed ? 'lg:grid-cols-[5rem_1fr]' : 'lg:grid-cols-[16rem_1fr]'}
      ${type ? 'py-2 pr-2' : ''}
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

         <section className={`${type && 'h-[98dvh] rounded-2xl'}  w-full  flex flex-col bg-gray-100 overflow-hidden`}>
            <Navbar
               onOpen={handleToggle}
            />
            <div className="flex-1 min-h-0 overflow-y-auto">
               <Outlet />
            </div>
         </section>

         {
            isToggled &&
            <Popover
               onClose={handleToggle}
               title="Configuración"
            >
               <div className="border border-gray-200 p-4 rounded-lg bg-white relative grid grid-cols-2 pt-10 py-5 mt-10 gap-3">
                  <Typography.P className="mt-4 bg-zinc-800 text-white p-1 rounded-xl px-2 !text-xs absolute -top-7 left-3">
                     Layout
                  </Typography.P>


                  <button
                     className="flex items-center justify-center gap-3  p-2 rounded-lg bg-gray-50 text-gray-800 text-sm border border-gray-100"
                     onClick={() => setType(false)}
                  >
                     <BiFoodMenu className="text-lg text-gray-400" />
                     Default
                  </button>

                  <button
                     className="flex items-center justify-center gap-3  p-2 rounded-lg bg-gray-50 text-gray-800 text-sm border border-gray-100"
                     onClick={() => setType(true)}
                  >
                     <BiFoodMenu className="text-lg text-gray-400" />
                     Compacto
                  </button>


               </div>

               <div className="border border-gray-200 p-4 rounded-lg bg-white relative grid grid-cols-3 pt-10 py-5 mt-10 gap-3">
                  <Typography.P className="mt-4 bg-zinc-800 text-white p-1 rounded-xl px-2 !text-xs absolute -top-7 left-3">
                     Ajustes preestablecidos
                  </Typography.P>
                  {
                     Object.values(colors).map((item) => (
                        <button
                           className="h-20 rounded-2xl flex items-center justify-center opacity-80"
                           style={{ backgroundColor: item }}
                           onClick={() => setColor(item)}>
                              <IoIosColorFilter className="text-white/50 text-2xl" />
                        </button>
                     ))
                  }

                  <input onChange={(e) => setColor(e.target.value)} type="color" />
               </div>



            </Popover>
         }
      </main>
   );
};

export default Layout;