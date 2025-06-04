import type { Position } from '@/domain/entities/rh';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { RxDotsVertical } from "react-icons/rx";
import { MdDelete, MdEdit } from "react-icons/md";
import type { DepartmentAction } from '../view/Puesto';



interface Props {
    handleAction: (args: DepartmentAction) => void
}
const useColumnPosition = ({ handleAction }: Props) => {
    return useMemo<ColumnDef<Position>[]>(() => [
        {
            accessorKey: "id",
            header: "ID",
            cell: info => info.getValue(),
        },
        {
            accessorKey: "name",
            header: "Posición",
            cell: info => info.getValue(),
        },
        {
            accessorKey: "department.name",
            header: "Nombre de departamento",
            cell: info => (
                <span className="" >
                    {info.row?.original?.department?.name || ''}
                </span>
            ),
        },
        {
            accessorKey: "department.abreviation",
            header: "Abreviacion",
            cell: info => (
                <span className="" >
                    {info.row?.original?.department?.abreviation || ''}
                </span>
            ),
        },
        {
            accessorKey: "salary.amount",
            header: "Salario",
            cell: info => (
                <span className="" >
                    {info.row?.original?.salary?.amount || ''}
                </span>
            ),
        },
        {
            accessorKey: "salary.salary_in_words",
            header: "Salario texto",
            cell: info => (
                <span className="" >
                    {info.row?.original?.salary?.salary_in_words || ''}
                </span>
            ),
        },
        {
            id: "actions",
            header: "Acciones",
            cell: info => (
                <div className='flex items-center'>
                    <Menu>
                        <MenuButton className="cursor-pointer p-2 hover:bg-gray-100 rounded-full border border-gray-50">
                            <RxDotsVertical />
                        </MenuButton>
                        <MenuItems anchor="bottom" className="bg-white px-4 py-2 flex flex-col gap-1 border border-gray-100 outline-none rounded-lg text-gray-700">
                            <MenuItem>
                                <button
                                    onClick={() => handleAction({ ...info.row.original, type: 'edit' })}
                                    className="py-1 hover:bg-gray-100 flex items-center gap-4 px-2 rounded-lg">
                                    <MdEdit />
                                    Editar
                                </button>
                            </MenuItem>
                            <hr className='border-b border-dotted border-gray-200' />
                            <MenuItem>
                                <button
                                    onClick={() => handleAction({ ...info.row.original, type: 'delete' })}
                                    className="py-1 hover:bg-gray-100 flex items-center gap-4 px-2 rounded-lg text-red-400">
                                    <MdDelete />
                                    Eliminar
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            ),
        },
    ], [handleAction]);
}

export default useColumnPosition