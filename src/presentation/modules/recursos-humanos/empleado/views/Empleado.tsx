import pdf from "@/presentation/assets/icons/pdf.png";
import TableStack from "@/presentation/components/data-display/TableStack";
import { Typography } from "@/presentation/components/ui/typography/Typography";
import { Button } from "@headlessui/react";
import { driver } from "driver.js";
import { useState } from "react";
import { IoSaveOutline } from "react-icons/io5";
import { RxDotsVertical } from "react-icons/rx";
import FormEmpleadoComponent from "../components/FormEmpleado.component";
import useColumnEmployees from "../hooks/useColumnEmployees";
import HeaderInfo from "@/presentation/components/data-display/Header-info";
import Modal from "@/presentation/components/data-display/Modal";
import useToggle from "@/presentation/hooks/ui/useToggle";
const datas = [
    {
        names: "Carlos",
        first_last_name: "Ramírez",
        second_last_name: "López",
        date_birth: "1985-07-12",
        year_old: 39,
        email: "carlos.ramirez@example.com",
        telephone: "555-123-4567",
        address: "Av. Insurgentes Sur 1234, CDMX",
        gender: "Masculino",
        curp: "RALC850712HDFMZR09",
        rfc: "RAL8507125J1",
        nss: "98765432101",
        ine_number: "1234567890123",
        alergy: "Ninguna",
        emergency_contact: [
            {
                name: "María López",
                relationship: "Esposa",
                phone: "555-987-6543"
            }
        ],
        nacionality: "Mexicana",
        status: "ACTIVE",
        blood_type: "O+",
        status_civil: "Casado/a",
        position_id: 2
    }
]
const Empleado = () => {
    const { isToggled, handleToggle } = useToggle();
    const [isDocument, setIsDocument] = useState(true);
    const driverObj = driver({
        showProgress: true,
        nextBtnText: "Siguiente",
        prevBtnText: "Anterior",
        doneBtnText: "Listo",
        steps: [
            {
                element: '#area',
                popover: {
                    title: 'Modulo Area',
                    description: 'Modulo encargado de administrar las áreas, donde podrás agregar, editar y eliminar áreas según sea necesario.',
                }
            },
            {
                element: '#puesto',
                popover: {
                    title: 'Modulo Puestos',
                    description: 'Modulo encargado de administrar los puestos de trabajo dentro de las áreas, donde podrás agregar, editar y eliminar puestos según sea necesario.',
                }
            },
            {
                element: '#table-search-users',
                popover: {
                    title: 'Barra de busqueda',
                    description: 'Filtro para buscar áreas específicas. Puedes buscar por nombre o abreviación.',
                }
            },
        ]
    });


    const columns = useColumnEmployees({ handleAction: () => setIsDocument(true) });

    return (
        <div className="bg-white border border-gray-200 px-5 py-2 rounded-lg">
            <HeaderInfo
                title="Recursos Humanos"
                subTitle="Alta de empleados"
                description="lorem2020 dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem2020 dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem2020 dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                fn={() => driverObj.drive()}
            />
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
                    data={datas || []}
                    columns={columns}
                    isFilters={false}
                />
            </div>

            {
                isToggled &&
                <Modal
                    open={isToggled}
                    onClose={handleToggle}
                    title="Agregar un nuevo empleado"
                    paragraph="Gestiona sin esfuerzo el alta de nuevo personal"
                >
                    <FormEmpleadoComponent />
                </Modal>
            }

            {
                isDocument &&
                <Modal
                    open={isDocument}
                    onClose={() => setIsDocument(false)}
                    title={`Documentos ${'Carlos'}`}
                    paragraph="Gestiona sin esfuerzo el alta de nuevo personal"
                >
                    <main>
                        <button>
                            Agregar
                        </button>
                        <section className="grid grid-cols-4 py-5 gap-5">
                            {
                                new Array(5).fill(0).map((_, index) => (
                                    <div className="bg-gray-50 p-2 rounded-lg border border-gray-200 flex flex-col items-start gap-4 relative">
                                        <span className="bg-primary text-xs text-white px-3  absolute top-0 left-0">Curp {index}</span>
                                        <img className="w-11 h-11 mt-5" src={pdf} alt="" />
                                        <div>
                                            <Typography.P className="text-xs font-medium">Documentos.pdf</Typography.P>
                                            <Typography.P className="text-xs font-medium">4.5 MB</Typography.P>
                                        </div>
                                        <div className="absolute top-2 right-2">
                                            <div className="group relative">
                                                <RxDotsVertical />

                                                <div className="hidden group-hover:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-lg  ">
                                                    <button
                                                        className="py-1 hover:bg-gray-100 flex items-center gap-4 px-2 rounded-lg text-sm">
                                                        Editar
                                                    </button>

                                                    <hr className='border-b border-dotted border-gray-200' />

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </section>
                    </main>
                </Modal>
            }

        </div>
    )
}

export default Empleado