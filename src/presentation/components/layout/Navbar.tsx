import { IoSettingsOutline } from "react-icons/io5"
import { RiHome4Line } from "react-icons/ri";
import { useLocation } from "react-router";

interface Props {
    onOpen: () => void
}
const Navbar = ({ onOpen }: Props) => {
    const location = useLocation();
    return (
        <nav className="bg-gray-50 py-4 flex justify-end md:justify-between items-center">
            <p className="text-xs text-gray-700 font-medium hidden md:flex items-center justify-center gap-1">
                <RiHome4Line className="text-sm" />
                {location.pathname.replace(/\//g, ' > ')}
            </p>
            <div className="flex items-center  gap-5">
                <button
                    onClick={onOpen}
                >
                    <IoSettingsOutline className="text-2xl text-gray-800/90" />
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