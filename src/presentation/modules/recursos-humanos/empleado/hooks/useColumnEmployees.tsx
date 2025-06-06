import type { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { RxDotsVertical } from 'react-icons/rx';
import Dropdown from '@/presentation/components/data-display/Dropdown';
import { MenuItem } from '@headlessui/react';
import doc from "@/presentation/assets/icons/carpeta.png";
interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

interface Employee {
  names: string;
  first_last_name: string;
  second_last_name: string;
  date_birth: string;
  year_old: number;
  email: string;
  telephone: string;
  address: string;
  gender: string;
  curp: string;
  rfc: string;
  nss: string;
  ine_number: string;
  alergy: string;
  emergency_contact: EmergencyContact[];
  nacionality: string;
  status: string;
  blood_type: string;
  status_civil: string;
  position_id: number;
}

interface Props {
  handleAction: (args: any) => void;
}

const useColumnEmployees = ({ handleAction }: Props) => {
  return useMemo<ColumnDef<Employee>[]>(() => [
    {
      accessorKey: 'names',
      header: () => <div className="px-2 w-54">Nombre(s)</div>,
    },
    {
      accessorKey: 'email',
      header: () => <div className="px-2">Correo Electrónico</div>,
    },
    {
      accessorKey: 'telephone',
      header: () => <div className="px-2">Teléfono</div>,
    },
    {
      accessorKey: 'address',
      header: () => <div className="px-2">Dirección</div>,
    },
    {
      id: 'emergency_contact',
      header: () => <div className="px-2 w-64">Contacto de Emergencia</div>,
      cell: info => {
        const contacts = info.row.original.emergency_contact;
        if (!contacts?.length) return '—';
        return contacts.map((c, i) => (
          <div key={i}>
            <p className="text-xs"><strong>{c.name}</strong> ({c.relationship}) - {c.phone}</p>
          </div>
        ));
      }
    },
    {
      accessorKey: 'nacionality',
      header: () => <div className="px-2">Documentos</div>,
      cell: () => (
        <div className='flex items-center justify-center'>
            <button className='flex items-center justify-center cursor-pointer transition-all hover:scale-105'>
            <img className='w-6 h-6' src={doc} alt="" />
            </button>
        </div>
      )
    },
    {
      id: 'actions',
      header: () => <div className="px-2">Acciones</div>,
      cell: info => (
        <div className='flex items-center justify-center'>
          <Dropdown Svg={<RxDotsVertical />}>
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
      )
    }
  ], [handleAction]);
};

export default useColumnEmployees;
