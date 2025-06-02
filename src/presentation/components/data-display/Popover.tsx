import { IoClose } from "react-icons/io5"
import { Typography } from "../ui/typography/Typography"
import type { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    title : string,
    onClose : () => void
}

const Popover = ({ title ,onClose, children }: Props) => {
    return (
        <section className="fixed top-0 right-0 w-90 h-full bg-white  shadow-lg p-5">
            <div className="flex items-center justify-between">
                <Typography.H3>
                    {title}
                </Typography.H3>

                <button 
                    onClick={onClose}
                    className="text-gray-500 text-xl bg-gray-100 p-1 rounded-lg border border-gray-200">
                    <IoClose />
                </button>
            </div>

            {children}
        </section>
    )
}

export default Popover