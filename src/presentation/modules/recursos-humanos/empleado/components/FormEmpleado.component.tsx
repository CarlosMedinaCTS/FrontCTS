import Input from "../../../../components/ui/inputs/Input"
import { Typography } from "../../../../components/ui/typography/Typography"


const FormEmpleadoComponent = () => {
    return (
        <section>
            <Typography.P className="text-xs text-gray-500 my-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque beatae consequatur sint, id sunt laudantium perspiciatis adipisci fugiat culpa alias.</Typography.P>
            <hr className="border border-gray-100 my-4" />

            <form action="" className="flex flex-col gap-3">
                <div>
                    <label className="text-gray-700 text-sm" htmlFor="">Nombre</label>
                    <Input
                        placeholder="Ingresa nombre"
                        type="text"
                    />
                </div>
                <div>
                    <label className="text-gray-700 text-sm" htmlFor="">Apellido materno</label>
                    <Input
                        placeholder="Ingresa nombre"
                        type="text"
                    />
                </div>
                <div>
                    <label className="text-gray-700 text-sm" htmlFor="">Apellido paterno</label>
                    <Input
                        placeholder="Ingresa nombre"
                        type="text"
                    />
                </div>

                <div className="flex gap-5">
                    <div>
                        <label className="text-gray-700 text-sm" htmlFor="">Fecha de nacimiento</label>
                        <Input
                            placeholder="Ingresa nombre"
                            type="date"
                        />
                    </div>
                    <div>
                        <label className="text-gray-700 text-sm" htmlFor="">Edad</label>
                        <p>20 años</p>
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
                    <label className="text-gray-700 text-sm" htmlFor="">Telefono</label>
                    <Input
                        placeholder="+55"
                        type="number"
                    />
                </div>

                <div>
                    <label className="text-gray-700 text-sm" htmlFor="">Direccion</label>
                    <Input
                        placeholder="Colonia morelos "
                        type="text"
                    />
                </div>

                <div>
                    <label className="text-gray-700 text-sm" htmlFor="">Genero</label>
                    <>
                        <div className="flex gap-2 justify-between items-center my-3">
                            <div className="flex items-center">
                                <input

                                    id="default-radio-2"
                                    type="radio"
                                    defaultValue=""
                                    name="default-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="default-radio-2"
                                    className="ms-2 text-xs text-gray-700 "
                                >
                                    Hombre
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input

                                    id="default-radio-2"
                                    type="radio"
                                    defaultValue=""
                                    name="default-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="default-radio-2"
                                    className="ms-2 text-xs text-gray-700 "
                                >
                                    Mujer
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input

                                    id="default-radio-2"
                                    type="radio"
                                    defaultValue=""
                                    name="default-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor="default-radio-2"
                                    className="ms-2 text-xs text-gray-700 "
                                >
                                    Otro
                                </label>
                            </div>
                        </div>

                    </>


                </div>
            </form>
        </section>
    )
}

export default FormEmpleadoComponent