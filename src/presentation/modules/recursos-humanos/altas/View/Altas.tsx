import { driver } from "driver.js";
import HeaderInfo from "../../../../components/data-display/Header-info"
import Tabs from "../../../../components/ui/tabs/Tabs"
import Area from "../../area/views/Area";
import Puesto from "../../puesto/view/Puesto";

const Altas = () => {
    const tabsContent = [
        { id: 1, label: "Area", content: <Area /> },
        { id: 2, label: "Puestos", content: <Puesto/> }
    ];

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
    return (
        <div className="bg-white px-5 py-2 rounded-lg border border-gray-200">
            <HeaderInfo
                title="Recursos Humanos"
                subTitle="Alta de Áreas y Puestos"
                description="lorem2020 dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem2020 dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem2020 dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
                fn={() => driverObj.drive()}
            />
            
            <Tabs
                tabsContent={tabsContent}
                initialTabId={1}
            />
        </div>
    )
}

export default Altas