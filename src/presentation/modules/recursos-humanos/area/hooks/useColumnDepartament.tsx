import type { Department } from '@/domain/entities/rh';
import { formatted } from '@/presentation/utils';
import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react'

interface Props{
    handleAction : (args : Department) => void
}
const useColumnDepartament = ( { handleAction } : Props) => {
    return useMemo<ColumnDef<Department>[]>(() => [
        {
            accessorKey: "id",
            header: "ID",
            cell: info => info.getValue(),
        },
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
            id: "updated_at",
            header: "Ultima actualización",
            cell: info => (
                <span className="" >
                    {formatted(info.row.original?.updated_at)
                    }
                </span>
            ),
        },
        {
            id: "status",
            header: "Estatus",
            cell: () => (
                <span className="bg-green-500/10 px-2 rounded-xl text-green-500 text-xs border border-green-200" >
                    activo
                </span>
            ),
        },
        {
            id: "actions",
            header: "Acciones",
            cell: info => (
                <div className="flex items-center gap-2" >
                    <button 
                        onClick={()=>handleAction(info.row.original)}
                        className="text-blue-500 hover:text-blue-700" > Editar </button>
                    < button className="text-red-500 hover:text-red-700" > Eliminar </button>
                </div>
            ),
        },
    ], []);
}

export default useColumnDepartament