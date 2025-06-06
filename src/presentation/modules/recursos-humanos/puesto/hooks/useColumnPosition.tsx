import type { Position } from '@/domain/entities/rh';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react'
import { MenuItem } from '@headlessui/react'
import { RxDotsVertical } from "react-icons/rx";
import { MdDelete, MdEdit } from "react-icons/md";
import type { DepartmentAction } from '../view/Puesto';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import Dropdown from '@/presentation/components/data-display/Dropdown';



interface Props {
    handleAction: (args: DepartmentAction) => void,
    showSalary: boolean
    fn: () => void
}
const useColumnPosition = ({ handleAction, showSalary, fn }: Props) => {
    return useMemo<ColumnDef<Position>[]>(() => [
        {
            accessorKey: "department.name",
            header: "Área",
            cell: info => (
                <span className="" >
                    {info.row?.original?.department?.name || ''}
                </span>
            ),
            enableSorting: true,
        },
        {
            accessorKey: "department.abreviation",
            header: "Abreviación de área",
            cell: info => (
                <span className="" >
                    {info.row?.original?.department?.abreviation || ''}
                </span>
            ),
        },
        {
            accessorKey: "name",
            header: "Dirección",
            cell: info => info.getValue(),
        },
        {
            accessorKey: "salary.amount",
            header: () => (
                <div className="flex items-center justify-center gap-2">
                    <span>Salario</span>
                    <button
                        onClick={fn}
                        className="text-xs px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 transition"
                    >
                        {
                            showSalary
                                ? <LuEye />
                                : <LuEyeClosed />
                        }
                    </button>
                </div>
            ),
            cell: info => (
                <span className="" >
                    {
                        showSalary
                            ? info.row?.original?.salary?.amount || ''
                            : '*******'
                    }
                </span>
            ),
            enableSorting: false,
        },
        {
            accessorKey: "salary.salary_in_words",
            header: "Salario texto",
            cell: info => (
                <span className="" >
                    {
                        showSalary
                            ? info.row?.original?.salary?.salary_in_words || ''
                            : '*******'
                    }
                </span>
            ),
        },
        {
            id: "actions",
            header: "Acciones",
            cell: info => (
                <div className='flex items-center justify-center'>
                    <Dropdown Svg={<RxDotsVertical />} >
                        <MenuItem>
                            <button
                                onClick={() => handleAction({ ...info.row.original, type: 'edit' })}
                                className="py-1 hover:bg-gray-100 flex items-center gap-4 px-2 rounded-lg text-sm">
                                <MdEdit />
                                Editar
                            </button>
                        </MenuItem>
                        <hr className='border-b border-dotted border-gray-200' />
                      
                        <MenuItem>
                            <button
                                onClick={() => handleAction({ ...info.row.original, type: 'delete' })}
                                className="py-1 hover:bg-gray-100 flex items-center gap-4 px-2 rounded-lg text-red-400 text-sm">
                                <MdDelete />
                                Eliminar
                            </button>
                        </MenuItem>
                    </Dropdown>
                </div>
            ),
        },
    ], [handleAction, showSalary, fn]);
}

export default useColumnPosition