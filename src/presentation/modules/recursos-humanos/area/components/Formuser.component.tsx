import Input from "@/presentation/components/ui/inputs/Input"
import { Typography } from "../../../../components/ui/typography/Typography"
import Button from "@/presentation/components/ui/buttons/Button"
import { useRef, type FormEvent } from "react"
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { rhServices } from "@/infrastructure/services/rh";
import useValidation from "@/presentation/hooks/shared/useValidation";
import Spinner from "@/presentation/components/ui/loaders/Spinner";
import type { Department } from "@/domain/entities/rh";
import { BiErrorCircle } from "react-icons/bi";

const apiRh = new rhServices();

interface Props {
    fn: () => void;
    values: Department
    allReset : () => void 
}

const FormuserComponent = ({ fn, values, allReset }: Props) => {
    const name = useRef<HTMLInputElement>(null);
    const abreviation = useRef<HTMLInputElement>(null);
    const { valid, handleBlur } = useValidation({ name: '', abreviation: '' })

    const mutation = useMutation({
        mutationFn: values.name
            ? (data: { name: string; abreviation: string; }) => apiRh.pathDepartament(data, values.id)
            : apiRh.postDepartament,
        onSuccess: (data) => {
            if (data.error) {
                toast.error(`${data.error}`)
                allReset();
            } else {
                toast.success(`Dato almacenado con exito`)
            }
            fn();
            if (name.current) name.current.value = "";
            if (abreviation.current) abreviation.current.value = "";
        },
        onError: (error) => { console.log(error) }
    });

    const enviarData = (e: FormEvent) => {
        e.preventDefault();
        const nameValue = name.current?.value.trim() || '';
        const abreviationValue = abreviation.current?.value.trim() || '';


        if (!nameValue || !abreviationValue) {
            toast.error("Existen datos vacíos, favor de llenar todos los campos");
            return;
        }


        if (Object.values(valid).some((v) => v !== "")) {
            toast.error("Existen datos vacíos, favor de llenar todos los campos");
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
                    </Typography.H3>
                </div>
            }



            <form onSubmit={enviarData} className="">
                <div className="flex flex-col mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre
                    </label>
                    <Input
                        ref={name}
                        defaultValue={values.name}
                        name="name"
                        placeholder="Nombre del departamento"
                        type="text"
                        className="placeholder:text-xs"
                        onBlur={handleBlur}
                    />
                    {valid.name && <Typography.P className="text-red-500 text-xs">{valid.name}</Typography.P>}
                </div>

                <div className="flex flex-col mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Abreviación
                    </label>
                    <Input
                        ref={abreviation}
                        name="abreviation"
                        defaultValue={values.abreviation}
                        placeholder="Nombre del abreviacion"
                        type="text"
                        className="placeholder:text-xs"
                        onBlur={handleBlur}
                    />
                    {valid.abreviation && <Typography.P className="text-red-500 text-xs">{valid.abreviation}</Typography.P>}
                </div>



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