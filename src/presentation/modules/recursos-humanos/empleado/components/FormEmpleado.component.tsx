import  { Typography } from "@/presentation/components/ui/typography/Typography"
import { Input } from "@headlessui/react"


const FormEmpleadoComponent = () => {
    return (
        <section>
            <hr className="border border-gray-100 my-4" />

            <form action="" className="flex flex-col gap-5">
                <div>
                    <label className="text-gray-700 text-sm" htmlFor="">Nombre</label>
                    <Input
                        placeholder="Ingresa nombre"
                        type="text"
                    />
                </div>

                <div className="flex gap-5 w-full">
                    <div className="flex flex-col w-full">
                        <label className="text-gray-700 text-sm" htmlFor="">Apellido materno</label>
                        <Input
                            placeholder="Ingresa nombre"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-gray-700 text-sm" htmlFor="">Apellido paterno</label>
                        <Input
                            placeholder="Ingresa nombre"
                            type="text"
                        />
                    </div>

                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div className="flex w-full flex-col">
                        <label className="text-gray-700 text-sm" htmlFor="">Fecha de nacimiento</label>
                        <Input
                            placeholder="Ingresa nombre"
                            type="date"
                        />
                    </div>
                    <div className="">
                        <label className="text-gray-700 text-sm" htmlFor="">Edad</label>
                        <Typography.P className="mt-1">20 años</Typography.P>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="text-gray-700 text-sm" htmlFor="">Telefono</label>
                        <Input
                            placeholder="+55"
                            type="number"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-gray-700 text-sm" htmlFor="">Genero</label>
                        <select className="bg-gray-50 border border-gray-100 p-2 rounded-lg " name="" id="">
                            <option value="">Masculino</option>
                            <option value="">Femenino</option>
                            <option value="">Otro</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="text-gray-700 text-sm" htmlFor="">Correo Electronico</label>
                    <Input
                        placeholder="Ingresa nombre"
                        type="email"
                    />
                </div>

                <div>
                    <label className="text-gray-700 text-sm" htmlFor="">Direccion</label>
                    <Input
                        placeholder="Colonia morelos "
                        type="text"
                    />
                </div>



                <Typography.H3>Documentación</Typography.H3>
                <hr className="border border-gray-100" />
                <div className="grid grid-cols-2 gap-5">
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                        <div className="flex gap-2 items-center">
                            <Typography.H3 className="text-sm">Curp</Typography.H3>
                            <span className="w-0.5 h-5 bg-gray-200 flex"> </span>
                            <Typography.P className="!text-blue-500 font-medium text-xs">Subir Archivo</Typography.P>
                        </div>

                        <div className="border border-gray-200 bg-white flex items-center gap-5 py-2 px-3 mt-2 rounded-lg">
                            <img className="w-8 h-8" src="https://cdn-icons-png.flaticon.com/512/4726/4726010.png" alt="" />
                            <div>
                                <Typography.P className="font-medium text-gray-700 text-xs">Curp MEVC000</Typography.P>
                                <Typography.P>PDF</Typography.P>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                        <div className="flex gap-2 items-center">
                            <Typography.H3 className="text-sm">RFC</Typography.H3>
                            <span className="w-0.5 h-5 bg-gray-200 flex"> </span>
                            <Typography.P className="!text-blue-500 font-medium text-xs">Subir Archivo</Typography.P>
                        </div>

                        <div className="border border-gray-200 bg-white flex items-center gap-5 py-2 px-3 mt-2 rounded-lg ">
                            <img className="w-8 h-8" src="https://cdn-icons-png.flaticon.com/512/4726/4726010.png" alt="" />
                            <div>
                                <Typography.P className="font-medium text-gray-700 text-xs">Curp MEVC000</Typography.P>
                                <Typography.P>PDF</Typography.P>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                        <div className="flex gap-2 items-center">
                            <Typography.H3 className="text-sm">NSS</Typography.H3>
                            <span className="w-0.5 h-5 bg-gray-200 flex"> </span>
                            <Typography.P className="!text-blue-500 font-medium text-xs">Subir Archivo</Typography.P>
                        </div>

                        <div className="border border-gray-200 bg-white flex items-center gap-5 py-2 px-3 mt-2 rounded-lg ">
                            <img className="w-8 h-8" src="https://cdn-icons-png.flaticon.com/512/4726/4726010.png" alt="" />
                            <div>
                                <Typography.P className="font-medium text-gray-700 text-xs">Curp MEVC000</Typography.P>
                                <Typography.P>PDF</Typography.P>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                        <div className="flex gap-2 items-center">
                            <Typography.H3 className="text-sm">INE</Typography.H3>
                            <span className="w-0.5 h-5 bg-gray-200 flex"> </span>
                            <Typography.P className="!text-blue-500 font-medium text-xs">Subir Archivo</Typography.P>
                        </div>

                        <div className="border border-gray-200 bg-white flex items-center gap-5 py-2 px-3 mt-2 rounded-lg ">
                            <img className="w-8 h-8" src="https://cdn-icons-png.flaticon.com/512/4726/4726010.png" alt="" />
                            <div>
                                <Typography.P className="font-medium text-gray-700 text-xs">Curp MEVC000</Typography.P>
                                <Typography.P>PDF</Typography.P>
                            </div>
                        </div>
                    </div>

                </div>

            </form>
        </section>
    )
}

export default FormEmpleadoComponent