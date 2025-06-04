import { IoSaveOutline } from "react-icons/io5";
import Popover from "../../../../components/data-display/Popover";
import useToggle from "../../../../hooks/ui/useToggle";
import FormPuesto from "../components/FormPuesto";
import Button from "../../../../components/ui/buttons/Button";
import type { CollatedDepartment, Position } from "@/domain/entities/rh";
import useApiQuery from "@/presentation/hooks/shared/useQuery";
import { rhServices } from "@/infrastructure/services/rh";
import useColumnPosition from "../hooks/useColumnPosition";
import TableStack from "@/presentation/components/data-display/TableStack";
import CircleLoader from "@/presentation/components/ui/loaders/CircleLoader";
import { useState } from "react";
import Alert from "@/presentation/components/data-display/Alert";
import Modal from "@/presentation/components/data-display/Modal";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const apiRh = new rhServices();
export interface DepartmentAction extends Position {
    type?: 'edit' | 'delete'
};

const Puesto = () => {
    const [valuesEdit, setValuesEdit] = useState({} as DepartmentAction)
    const { isToggled, handleToggle, handleManual } = useToggle();
    const { data, isLoading, isFetching, refetch } = useApiQuery<CollatedDepartment<Position>>(['position'], () => apiRh.getPosition());

    const mutation = useMutation({
        mutationFn: (id: number) => apiRh.deletePosition(id),
        onSuccess: (data) => {
            console.log(data)
            if (data.error) {
                toast.error(`${data.error}`);
            } else {
                toast.success(`Dato Eliminado con exito`)
            }
            onClose();
            refetch();
        },
        onError: (error) => { console.log(error) }
    });


    const handleAction = (item: DepartmentAction) => {
        handleManual(true);
        setValuesEdit(item);
    };

    const columns = useColumnPosition({ handleAction })

    const allReset = () => {
        setValuesEdit({} as DepartmentAction);
        refetch();
    }

    const onClose = () => {
        handleManual(false);
        setValuesEdit({} as DepartmentAction);
    }

    return (
        <div>

            <div className="relative overflow-x-auto">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white ">
                    <Button
                        onClick={handleToggle}
                    >
                        <IoSaveOutline className="text-lg" />
                        <span>Alta de Area</span>
                    </Button>
                </div>

                <TableStack
                    data={data?.data || []}
                    columns={columns}
                />

            </div>



            {isToggled && valuesEdit.type !== 'delete' && (
                <Popover title="Alta de Área" onClose={onClose}>
                    <FormPuesto
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
        </div>
    )
}

export default Puesto