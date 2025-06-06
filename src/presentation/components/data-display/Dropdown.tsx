import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { type PropsWithChildren } from 'react'
interface Props extends PropsWithChildren {
    Svg: React.ReactNode
    cn?: string
}

const Dropdown = ({ Svg, cn, children: Children }: Props) => {
    return (
        <Menu>
            <MenuButton className={`cursor-pointer p-2 hover:bg-gray-100 rounded-full border border-gray-50 ${cn}`}>
                {Svg}
            </MenuButton>
            <MenuItems anchor="right" className="bg-white px-4 py-2 flex flex-col gap-1 border border-gray-100 outline-none rounded-lg text-gray-700">
                {Children}
            </MenuItems>
        </Menu>
    )
}

export default Dropdown