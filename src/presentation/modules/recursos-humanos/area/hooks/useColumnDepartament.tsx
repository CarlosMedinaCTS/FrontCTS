import type { Department } from '@/domain/entities/rh';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react'
import { MenuItem } from '@headlessui/react'
import { RxDotsVertical } from "react-icons/rx";
import { MdDelete, MdEdit } from "react-icons/md";
import type { DepartmentAction } from '../views/Area';
import Dropdown from '@/presentation/components/data-display/Dropdown';



interface Props {
    handleAction: (args: DepartmentAction) => void
}
const useColumnDepartament = ({ handleAction }: Props) => {
    return useMemo<ColumnDef<Department>[]>(() => [
        {
            accessorKey: "name",
            header: "Nombre del Área",
            cell: info => info.getValue(),
        },
        {
            accessorKey: "abreviation",
            header: "Abreviación",
            cell: info => info.getValue(),
        },
        {
            id: "positions",
            header: "Posiciones releacionadas", 
            cell: (info) => (
                <span className="bg-blue-500/10 px-2 rounded-xl text-blue-500 text-xs border border-green-200" >
                    {info.row.original?.positions?.length || 0}
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

                        {
                            info.row.original?.positions?.length === 0 &&
                            <MenuItem>
                                <button
                                    onClick={() => handleAction({ ...info.row.original, type: 'delete' })}
                                    className="py-1 hover:bg-gray-100 flex items-center gap-4 px-2 rounded-lg text-red-400 text-sm">
                                    <MdDelete />
                                    Eliminar
                                </button>
                            </MenuItem>
                        }
                    </Dropdown>

                </div>
            ),
        },
    ], [handleAction]);
}

export default useColumnDepartament