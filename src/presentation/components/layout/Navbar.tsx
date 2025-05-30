import Input from "../ui/Input"
import { IoSettingsOutline } from "react-icons/io5"

interface Props {
    onOpen : ()=> void
}
const Navbar = ( { onOpen } : Props ) => {
    return (
        <nav className="bg-white p-3 border-b border-gray-200 flex justify-between border-l items-center px-5">
            <div className="w-90 ">
                <Input placeholder="Buscar Modulo ... " />
            </div>
            <div className="flex items-center gap-5">
                <button
                    onClick={onOpen}
                >
                    <IoSettingsOutline className="text-2xl text-gray-800/90"/>
                </button>
                <div 
                    className="bg-zinc-800 p-2 rounded-full text-white w-7 h-7 flex items-center justify-center text-xs">
                    JC
                </div>
            </div>
        </nav>
    )
}

export default Navbar