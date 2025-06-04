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





const apiRh = new rhServices();

const Area = () => {
  const [valuesEdit, setValuesEdit] = useState({} as Department)
  const { isToggled, handleToggle } = useToggle();

  const { data, isLoading, isFetching, refetch } = useApiQuery<CollatedDepartment>(['department'], () => apiRh.getUser());

  const handleAction = (item: Department) => {
    setValuesEdit(item);
    handleToggle();
  };

  const columns = useColumnDepartament({ handleAction });

  const allReset = ()=> {
    setValuesEdit({} as Department)
  }

  const onClose = () => {
    handleToggle()
    setValuesEdit({} as Department)
  }

  return (
    <section className="bg-white relative">
      <div className="relative overflow-x-auto">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white">
          <Button onClick={handleToggle}>
            <IoSaveOutline className="text-lg" />
            <span>Alta de Área</span>
          </Button>
        </div>

        <TableStack
          data={data?.data || []}
          columns={columns}
        />
      </div>

      {isToggled && (
        <Popover title="Alta de Área" onClose={onClose}>
          <FormuserComponent
            fn={refetch}
            values={valuesEdit}
            allReset={allReset}
          />
        </Popover>
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