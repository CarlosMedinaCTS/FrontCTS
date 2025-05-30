import { BiFoodMenu } from "react-icons/bi";
import { IoIosColorFilter } from "react-icons/io";
import { Typography } from "../ui/Typography";

interface LayoutPanelProps {
  setType: (type: boolean) => void;
}
interface ColorPanelProps {
  colors: Record<string, string>;
  setColor: (color: string) => void;
}

export const LayoutPanel = ({ setType }: LayoutPanelProps) => (
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
);



export const ColorPanel = ({ colors, setColor }: ColorPanelProps) => (
  <div className="border border-gray-200 p-4 rounded-lg bg-white relative grid grid-cols-3 pt-10 py-5 mt-10 gap-3">
    <Typography.P className="mt-4 bg-zinc-800 text-white p-1 rounded-xl px-2 !text-xs absolute -top-7 left-3">
      Ajustes preestablecidos
    </Typography.P>
    {Object.values(colors).map((item) => (
      <button
        key={item}
        className="h-20 rounded-2xl flex items-center justify-center opacity-80"
        style={{ backgroundColor: item }}
        onClick={() => setColor(item)}
      >
        <IoIosColorFilter className="text-white/50 text-2xl" />
      </button>
    ))}
    <input onChange={(e) => setColor(e.target.value)} type="color" />
  </div>
);