import FormField from "@/presentation/components/data-display/FormField"
import Button from "@/presentation/components/ui/buttons/Button";
import useValidation from "@/presentation/hooks/shared/useValidation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import useApiQuery from "@/presentation/hooks/shared/useQuery";
import { rhServices, type RequestPosition } from "@/infrastructure/services/rh";
import type { CollatedDepartment, Department } from "@/domain/entities/rh";
import Spinner from "@/presentation/components/ui/loaders/Spinner";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AutocompleteInput from "@/presentation/components/ui/inputs/AutoComplete";
import type { DepartmentAction } from "../view/Puesto";


const apiRh = new rhServices();

interface Props {
    fn: () => void;
    values: DepartmentAction
}

const FormPuesto = ({ fn, values }: Props) => {
    const [selected, setSelected] = useState<Department | null>(null);
    const name = useRef<HTMLInputElement>(null);
    const amount = useRef<HTMLInputElement>(null);
    const salaryWord = useRef<HTMLInputElement>(null);

    const { valid, handleBlur } = useValidation(
        { name: "", amount: "", salaryWord: '' },
        { name: { min: 3, max : 70 }, amount: { min: 3, max: 13 }, salaryWord: { min: 3, max: 50 } }
    );

    const mutation = useMutation({
        mutationFn: (data: RequestPosition) => {
            if (values.type === 'edit') {
                return apiRh.pathPosition(data, values.id);
            }
            return apiRh.postPosition(data);
        },
        onSuccess: (data) => {
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
        e.preventDefault();
        const nameValue = name.current?.value.trim() || '';
        const amountValues = amount.current?.value.trim() || '';
        const salaryWordValues = salaryWord.current?.value.trim() || '';


        if (!nameValue || !amountValues || !salaryWordValues || !selected?.id) {
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
                amount: +amountValues,
                salary_in_words: salaryWordValues
            },
            department_id: selected.id
        });
    };

    const { data, isLoading } = useApiQuery<CollatedDepartment<Department>>(['department'], () => apiRh.getUser());

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

            <form onSubmit={onSubmit} className="">
                <FormField
                    field={{
                        name: "name",
                        label: "Nombre",
                        placeholder: "Nombre del departamento",
                        defaultValue: values.name,
                        min: 3,
                    }}
                    refInput={name}
                    error={valid.name}
                    handleBlur={handleBlur}
                />

                <FormField
                    field={{
                        name: "amount",
                        label: "Monto",
                        placeholder: "Ingresa Monto",
                        defaultValue: values?.salary?.amount,
                    }}
                    refInput={amount}
                    error={valid.amount}
                    handleBlur={handleBlur}
                />

                <FormField
                    field={{
                        name: "salaryWord",
                        label: "Salario palabras",
                        placeholder: "Salario en palabras",
                        defaultValue: values?.salary?.salary_in_words,
                        min: 3,
                        max: 9,
                    }}
                    refInput={salaryWord}
                    error={valid.salaryWord}
                    handleBlur={handleBlur}
                />


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