import Popover from "@/presentation/components/data-display/Popover";
import TableStack from "@/presentation/components/data-display/TableStack";
import useToggle from "@/presentation/hooks/ui/useToggle";
import { IoSaveOutline } from "react-icons/io5";
import FormuserComponent from "../components/Formuser.component";
import Button from "@/presentation/components/ui/buttons/Button";
import useApiQuery from "@/presentation/hooks/shared/useQuery";
import { rhServices } from "@/infrastructure/services/rh";
import CircleLoader from "@/presentation/components/ui/loaders/CircleLoader";
import type { CollatedDepartment, Department } from "@/domain/entities/rh";
import useColumnDepartament from "../hooks/useColumnDepartament";
import { useState } from "react";
import Alert from "@/presentation/components/data-display/Alert";
import Modal from "@/presentation/components/data-display/Modal";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export interface DepartmentAction extends Department {
  type?: 'edit' | 'delete'
};


const apiRh = new rhServices();

const Area = () => {
  const [valuesEdit, setValuesEdit] = useState({} as DepartmentAction)
  const { isToggled, handleManual } = useToggle();

  const { data, isLoading, isFetching, refetch } = useApiQuery<CollatedDepartment<Department>>(['department'], () => apiRh.getUser());

  const mutation = useMutation({
    mutationFn: (id: number) => apiRh.deleteDepartament(id),
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

  return (
    <section className="bg-white relative">
      <div className="relative overflow-x-auto">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
          <Button onClick={() => handleManual(true)}>
            <IoSaveOutline className="text-lg" />
            <span>Alta de Área</span>
          </Button>
        </div>

        <TableStack
          data={data?.data || []}
          columns={columns}
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