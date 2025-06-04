import { Typography } from "../../../../components/ui/typography/Typography"
import Button from "@/presentation/components/ui/buttons/Button"
import { useRef, type FormEvent } from "react"
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { rhServices, type RequestDepartament } from "@/infrastructure/services/rh";
import useValidation from "@/presentation/hooks/shared/useValidation";
import Spinner from "@/presentation/components/ui/loaders/Spinner";
import { BiErrorCircle } from "react-icons/bi";
import FormField from "@/presentation/components/data-display/FormField";
import type { DepartmentAction } from "../views/Area";

const apiRh = new rhServices();

interface Props {
    fn: () => void;
    values: DepartmentAction
}

const FormuserComponent = ({ fn, values }: Props) => {
    const name = useRef<HTMLInputElement>(null);
    const abreviation = useRef<HTMLInputElement>(null);
    const { valid, handleBlur } = useValidation(
        { name: "", abreviation: "" },
        { name: { min: 3, max : 70 }, abreviation: { min: 2, max: 9 } }
    );

    const mutation = useMutation({
        mutationFn: (data: RequestDepartament) => {
            if (values.type === 'edit') {
                return apiRh.pathDepartament(data, values.id);
            }
            return apiRh.postDepartament(data);
        },
        onSuccess: (data) => {
            console.log(data)
            if (data.error) {
                toast.error(`${data.error}`);
            } else {
                toast.success(`Dato almacenado con exito`)
            }
            fn();
            if (name.current) name.current.value = "";
            if (abreviation.current) abreviation.current.value = "";
        },
        onError: (error) => { console.log(error) }
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        const nameValue = name.current?.value.trim() || '';
        const abreviationValue = abreviation.current?.value.trim() || '';


        if (!nameValue || !abreviationValue) {
            toast.error("Favor de llenar los campos correspondientes");
            return;
        }


        if (Object.values(valid).some((v) => v !== "")) {
            toast.error("Favor de llenar los campos correspondientes");
            return;
        }
        mutation.mutate({
            name: nameValue,
            abreviation: abreviationValue
        });
    };

    return (
        <>
            <Typography.P className="text-xs text-gray-500 my-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque beatae consequatur sint, id sunt laudantium perspiciatis adipisci fugiat culpa alias.
            </Typography.P>
            <hr className="border border-gray-100 my-4" />

            {
                mutation.data?.error &&
                <div className=" bg-red-50 py-2 flex gap-2 rounded-2xl my-5 px-1 items-center border border-red-100">
                    <BiErrorCircle className="text-red-400 text-3xl text-center bg-red-100 p-1 rounded-full border border-red-200" />
                    <Typography.H3 className="font-normal flex flex-col gap-1 text-sm">
                        Algo no está bien
                        <Typography.P className="text-xs">{mutation.data?.error}</Typography.P>
                        <Typography.P className="text-xs">{JSON.stringify(mutation.data)}</Typography.P>
                    </Typography.H3>
                </div>
            }



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
                        name: "abreviation",
                        label: "Abreviación",
                        placeholder: "Nombre del abreviacion",
                        defaultValue: values.abreviation,
                        min: 3,
                        max: 9,
                    }}
                    refInput={abreviation}
                    error={valid.abreviation}
                    handleBlur={handleBlur}
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

export default FormuserComponent