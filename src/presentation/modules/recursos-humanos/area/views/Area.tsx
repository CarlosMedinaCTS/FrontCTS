import type { Department, Response, ResponseData, UpdatePayload } from "@/domain/entities/rh";
import Alert from "@/presentation/components/data-display/Alert";
import Modal from "@/presentation/components/data-display/Modal";
import Popover from "@/presentation/components/data-display/Popover";
import TableStack from "@/presentation/components/data-display/TableStack";
import Button from "@/presentation/components/ui/buttons/Button";
import CircleLoader from "@/presentation/components/ui/loaders/CircleLoader";
import useApiQuery from "@/presentation/hooks/shared/useQuery";
import useToggle from "@/presentation/hooks/ui/useToggle";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { IoSaveOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import FormuserComponent from "../components/Formuser.component";
import useColumnDepartament from "../hooks/useColumnDepartament";
import { rhServices } from "@/infrastructure/services/rh";
import { RiRefreshLine } from "react-icons/ri";
import { CiExport } from "react-icons/ci";
import useExcel from "@/presentation/hooks/shared/useExcel";
import Dropdown from "@/presentation/components/data-display/Dropdown";
import { VscSettings } from "react-icons/vsc";
import Switch from "@/presentation/components/ui/inputs/Switch";

export interface DepartmentAction extends Department {
  type?: 'edit' | 'delete'
};

const apiRh = new rhServices();

const Area = () => {
  const [valuesEdit, setValuesEdit] = useState({} as DepartmentAction)
  const { isToggled, handleManual } = useToggle();
  const [isBoolFilter, setIsBoolFilter] = useState(false);

  const { data, isLoading, isFetching, refetch } = useApiQuery<Response<Department[]>>(['department'], () => apiRh.getDepartament<Response<Department[]>>());

  const mutation = useMutation({
    mutationFn: (id: number) => apiRh.deleteDepartament<ResponseData<UpdatePayload>>(id),
    onSuccess: (data) => {
      console.log(data)
      if (data.error) {
        toast.error(`${data.error}`);
      } else {
        toast.success(`Dato Eliminado con exito`)
      };
      onClose();
      refetch();
    },
    onError: (error) => { console.log(error) }
  });

  const handleAction = (item: DepartmentAction) => {
    handleManual(true);
    setValuesEdit(item);
  };

  const allReset = () => {
    setValuesEdit({} as DepartmentAction);
    refetch();
  };

  const onClose = () => {
    handleManual(false);
    setValuesEdit({} as DepartmentAction);
  };

  const columns = useColumnDepartament({ handleAction });

  const { downloadExcel } = useExcel()





  const mapperExcel = (data: Department) => {
    return {
      fecha_Creacion: data.created_at,
      fecha_Actualizacion: data.updated_at,
      nombre: data.name,
      abreviacion: data.abreviation,
      numero_De_Puestos_Relacionados: data.positions?.length
    }
  }
  return (
    <section className="bg-white relative">
      <div className="relative overflow-x-auto">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
          <Button onClick={() => handleManual(true)}>
            <IoSaveOutline className="text-lg" />
            <span>Alta de Área</span>
          </Button>
          <div className="flex gap-2">
            <button
              className="border border-gray-200 p-1 px-1.5 rounded-xl bg-gray-100 group cursor-pointer"
              disabled={isLoading || isFetching}
              onClick={() => refetch()}
            >
              <RiRefreshLine className="text-xl text-gray-600 transition-all group-hover:animate-spin" />
            </button>

            <Dropdown
              cn="border border-gray-200 rounded-xl bg-gray-100 group cursor-pointe"
              Svg={<VscSettings className=" text-gray-700" />}
            >
              <button
                className="flex text-sm justify-between transition-all items-center gap-2 hover:bg-gray-100 p-2 rounded"
                onClick={() => downloadExcel(data?.data.map(mapperExcel) || [])}
              >
                Exportar
                <CiExport className="text-lg" />
              </button>
              <hr className="border-b border-gray-100 my-2" />
              <button className="flex text-sm justify-between transition-all items-center gap-2 hover:bg-gray-100 p-2 rounded">
                Filtros
                <Switch checked={isBoolFilter} onChange={() => setIsBoolFilter(!isBoolFilter)} />
              </button>
            </Dropdown>
          </div>
        </div>

        <TableStack
          data={data?.data || []}
          columns={columns}
          isFilters={isBoolFilter}
        />
      </div>

      {isToggled && valuesEdit.type !== 'delete' && (
        <Popover title="Alta de Área" onClose={onClose}>
          <FormuserComponent
            fn={allReset}
            values={valuesEdit}
          />
        </Popover>
      )}


      {isToggled && valuesEdit.type === 'delete' && (
        <Modal open={isToggled} title="" onClose={onClose} paragraph="">
          <Alert
            closeModal={onClose}
            handleAction={() => mutation.mutate(valuesEdit.id)}
            values={`${valuesEdit.name}`}
          />

        </Modal>
      )}

      {(isLoading || isFetching) && (
        <div className="fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center bg-white/80">
          <CircleLoader message="Consultando" />
        </div>
      )}
    </section>
  )
}

export default Area