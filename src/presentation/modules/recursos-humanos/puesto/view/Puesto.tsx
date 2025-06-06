import type { Position, Response, ResponseData, UpdatePayload } from "@/domain/entities/rh";
import { rhServices } from "@/infrastructure/services/rh";
import Alert from "@/presentation/components/data-display/Alert";
import Dropdown from "@/presentation/components/data-display/Dropdown";
import Modal from "@/presentation/components/data-display/Modal";
import Popover from "@/presentation/components/data-display/Popover";
import TableStack from "@/presentation/components/data-display/TableStack";
import Button from "@/presentation/components/ui/buttons/Button";
import Switch from "@/presentation/components/ui/inputs/Switch";
import CircleLoader from "@/presentation/components/ui/loaders/CircleLoader";
import useExcel from "@/presentation/hooks/shared/useExcel";
import useApiQuery from "@/presentation/hooks/shared/useQuery";
import useToggle from "@/presentation/hooks/ui/useToggle";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { CiExport } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";
import { RiRefreshLine } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";
import { toast } from "react-toastify";
import FormPuesto from "../components/FormPuesto";
import useColumnPosition from "../hooks/useColumnPosition";


const apiRh = new rhServices();
export interface DepartmentAction extends Position {
    type?: 'edit' | 'delete'
};

const Puesto = () => {
    const [valuesEdit, setValuesEdit] = useState({} as DepartmentAction)
    const { isToggled, handleToggle, handleManual } = useToggle();
    const { data, isLoading, isFetching, refetch } = useApiQuery<Response<Position[]>>(['position'], () => apiRh.getPosition<Response<Position[]>>());
    const [isBoolSalary, setIsBoolSalary] = useState(false);
    const [isBoolFilter, setIsBoolFilter] = useState(false);

    const mutation = useMutation({
        mutationFn: (id: number) => apiRh.deletePosition<ResponseData<UpdatePayload>>(id),
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

    const columns = useColumnPosition({ handleAction, showSalary: isBoolSalary, fn: () => setIsBoolSalary(!isBoolSalary) });

    const allReset = () => {
        setValuesEdit({} as DepartmentAction);
        refetch();
        handleManual(false);
    }

    const onClose = () => {
        handleManual(false);
        setValuesEdit({} as DepartmentAction);
    }

    const { downloadExcel } = useExcel()


    const mapper = (data: Position) => {
        return {
            nombre: data.name,
            salario: data.salary.amount,
            departamento: data.department.name,
            abreviacion: data.department.abreviation,
            fecha_Creacion: data.created_at,
            fecha_Actualizacion: data.updated_at,
            salario_texto: data.salary.salary_in_words
        }
    }



    return (
        <div>

            <div className="relative overflow-x-auto">
                <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white ">
                    <Button
                        onClick={handleToggle}
                    >
                        <IoSaveOutline className="text-lg" />
                        <span>Alta de Direcciones</span>
                    </Button>

                    <div className="flex gap-2">
                        <button
                            className="border border-gray-200 p-1 rounded-xl bg-gray-100 group cursor-pointer"
                            disabled={isLoading || isFetching}
                            onClick={() => refetch()}
                        >
                            <RiRefreshLine className="text-xl text-gray-700 transition-all group-hover:animate-spin" />
                        </button>



                        <Dropdown
                            cn="border border-gray-200 rounded-xl bg-gray-100 group cursor-pointe"
                            Svg={<VscSettings className=" text-gray-700" />}
                        >
                            <button
                                className="flex text-sm justify-between transition-all items-center gap-2 hover:bg-gray-100 p-2 rounded"
                                onClick={() => downloadExcel(data?.data.map(mapper) || [])}
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
                <Popover title="Alta de direcciones" onClose={onClose}>
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