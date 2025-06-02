import { Typography } from "../ui/typography/Typography"
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaInfo } from "react-icons/fa6";
interface Props {
    title: string;
    description: string;
    subTitle: string;
    fn: () => void;
}
const HeaderInfo = ({ title, description, subTitle, fn }: Props) => {
    return (
        <>
            <Typography.H1 >{title}</Typography.H1>
            <div className="bg-indigo-50 p-5 mt-3 border border-gray-100 rounded-lg mb-4 flex items-center gap-5 shadow-sm">

                <div>
                    <Typography.H2 className="flex items-center gap-2 mb-2">
                        <FaInfo className="bg-indigo-500 text-2xl text-white font-medium p-1 rounded-full" />
                        {subTitle}
                    </Typography.H2>
                    <Typography.P className="text-gray-600 text-sm">{description}</Typography.P>
                    <button
                        className="bg-zinc-800 mt-5 backdrop-blur-sm p-2 flex gap-2 items-center rounded-lg px-5 transition-all group hover:scale-105"
                        onClick={fn}
                    >
                        <Typography.P className="text-white">Iniciar Tutorial</Typography.P>
                        <IoIosArrowRoundForward className="text-2xl -rotate-45 text-white transition-all group-hover:rotate-0" />

                    </button>
                </div>
            </div>
        </>
    )
}

export default HeaderInfo