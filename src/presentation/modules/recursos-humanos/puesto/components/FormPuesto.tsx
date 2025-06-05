import type { Department, Position, RequestPosition, Response, ResponseData, UpdatePayload } from "@/domain/entities/rh";
import { rhServices } from "@/infrastructure/services/rh";
import FormField from "@/presentation/components/data-display/FormField";
import Button from "@/presentation/components/ui/buttons/Button";
import AutocompleteInput from "@/presentation/components/ui/inputs/AutoComplete";
import Input from "@/presentation/components/ui/inputs/Input";
import Label from "@/presentation/components/ui/inputs/Label";
import Spinner from "@/presentation/components/ui/loaders/Spinner";
import useCurrency from "@/presentation/hooks/shared/useCurrency";
import useApiQuery from "@/presentation/hooks/shared/useQuery";
import useValidation from "@/presentation/hooks/shared/useValidation";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import type { DepartmentAction } from "../view/Puesto";
import toWords from "@/presentation/utils/numberToWords";


const apiRh = new rhServices();

interface Props {
    fn: () => void;
    values: DepartmentAction
}

const convertir = toWords({ unidad: 'MXN', mayus: true });

const FormPuesto = ({ fn, values }: Props) => {
    const [selected, setSelected] = useState<Department | null>(null);
    const name = useRef<HTMLInputElement>(null);
    const { value, display, handleChanges, handleBlurd, handleFocus } = useCurrency(values?.salary?.amount ?? '');

    const { valid, handleBlur, config } = useValidation(
        { name: "", amount: "", salaryWord: "" },
        { name: { min: 3, max: 70 }, amount: { min: 3, max: 6 }, salaryWord: { min: 3, max: 50 } }
    );

    const mutation = useMutation({

        mutationFn: (data: RequestPosition) => {
            if (values.type === 'edit') {
                return apiRh.pathPosition<ResponseData<UpdatePayload>>(data, values.id);
            }
            return apiRh.postPosition<ResponseData<Position>>(data);
        },
        onSuccess: (data: ResponseData<Position | UpdatePayload>) => {
            console.log(data)
            if (data.error) {
                toast.error(`${data.error}`);
            } else {
                toast.success(`Dato almacenado con exito`)
            }
            fn();
        },
        onError: (error) => { console.log(error) }
    });


    const onSubmit = (e: FormEvent) => {
        console.log(value)
        e.preventDefault();
        const nameValue = name.current?.value.trim() || '';
        if (!nameValue || !value  || !selected?.id) {
            toast.error("Favor de llenar los campos correspondientes");
            return;
        }


        if (Object.values(valid).some((v) => v !== "")) {
            toast.error("Favor de llenar los campos correspondientes");
            return;
        }
        mutation.mutate({
            name: nameValue,
            salary: {
                amount: value,
                salary_in_words: convertir(value)
            },
            department_id: selected.id
        });
    };

    const { data, isLoading } = useApiQuery<Response<Department[]>>(['department'], () => apiRh.getDepartament<Response<Department[]>>());

    useEffect(() => {
        if (values?.department?.id && data?.data) {
            const found = data.data.find(dep => dep.id === values?.department?.id);
            if (found) setSelected(found);
        }
    }, [values?.department?.id, data?.data]);




    return (
        <>

            <p className="text-xs text-gray-500 my-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque beatae consequatur sint, id sunt laudantium perspiciatis adipisci fugiat culpa alias.</p>
            <hr className="border border-gray-100 my-4" />

            <form onSubmit={onSubmit} autoComplete="off">
                <FormField
                    field={{
                        name: "name",
                        label: "Nombre",
                        placeholder: "Nombre del departamento",
                        defaultValue: values.name,
                        min: config.name.min,
                        max: config.name.max
                    }}
                    refInput={name}
                    error={valid.name}
                    handleBlur={handleBlur}
                />
                <div>
                    <Label label="Monto" />
                    <Input
                        type="text"
                        inputMode="decimal"
                        value={display}
                        onChange={handleChanges}
                        onBlur={handleBlurd}
                        onFocus={handleFocus}
                        maxLength={config.amount.max}
                        minLength={config.amount.min}
                    />
                </div>


                <AutocompleteInput
                    label="Departamentos"
                    options={data?.data || []}
                    getOptionLabel={(option) => option.name}
                    value={selected}
                    onChange={setSelected}
                    isLoading={isLoading}
                />



                <Button
                    disabled={mutation.isPending}
                >
                    Guardar Datos
                    {
                        mutation.isPending && <Spinner />
                    }
                </Button>
            </form>
        </>
    )
}

export default FormPuesto