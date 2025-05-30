import { useState } from "react"
import { IoSaveOutline } from "react-icons/io5"
import Input from "../../../../components/ui/Input";
import HeaderInfo from "../../../../components/data-display/Header-info";
import { driver } from 'driver.js';
import "driver.js/dist/driver.css";


const Area = () => {
  const [isModal, setIsModal] = useState(false);

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
    <section className="p-5 bg-white  sm:rounded-lg relative shadow-sm">

      <HeaderInfo
        title="Recursos Humanos"
        subTitle="Áreas"
        description="lorem2020 dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem2020 dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. lorem2020 dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
        fn = { ()=> driverObj.drive() }
      />

      <div className="flex justify-start items-center gap-4 mb-4 border-b-2 border-gray-200">
        <button 
          id="area"
          className="px-5 py-1 border-b-2 border-primary text-sm bg-white -mb-0.5 text-primary font-medium">
          Area
        </button>
        <button 
          id="puesto"
          className="px-5 py-1 text-sm bg-white">
          Puestos
        </button>
      </div>

      <div className="relative overflow-x-auto">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white ">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>

          <button
            className="bg-linear-to-r from-gray-800 via-blue-700 to-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-3 text-sm"
            onClick={() => setIsModal(true)}
          >
            <IoSaveOutline className="text-lg" />
            Agregar Area
          </button>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 "
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Area
              </th>
              <th scope="col" className="px-6 py-3">
                Abreviación
              </th>
              <th scope="col" className="px-6 py-3">
                Alta
              </th>
              <th scope="col" className="px-6 py-3">
                Estatus
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b border-gray-100">
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
              >
                <div className="ps-3">
                  <p className="font-normal text-gray-500">
                    Tecnologias de la informacion y comunicaciín
                  </p>
                </div>
              </th>
              <td className="px-6 py-4">TI</td>
              <td className="px-6 py-4">29-05-2025</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" />{" "}
                  Activo
                </div>
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600  hover:underline"
                >
                  Editar Area
                </a>
              </td>
            </tr>

          </tbody>
        </table>
        <div>

        </div>
      </div>
      

      {
        isModal &&
        <div className="fixed bg-white top-0 right-0 w-[28rem] h-screen px-5 py-10 shadow-sm">
          <button
            onClick={() => setIsModal(false)}
            className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 transition-colors bg-gray-100 px-2 rounded-lg border border-gray-200"
          >
            x
          </button>
          <h3 className="font-medium text-gray-800 text-xl">Alta de Areas</h3>
          <p className="text-xs text-gray-500 my-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque beatae consequatur sint, id sunt laudantium perspiciatis adipisci fugiat culpa alias.</p>
          <hr className="border border-gray-100 my-4" />


          <form action="">
            <div className="mb-4">
              <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">Nombre del Area</label>
              <Input
                type="text"
                id="area"
                placeholder="Ingresa el nombre del area"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="abreviación" className="block text-sm font-medium text-gray-700 mb-2">Abreviación</label>
              <Input
                type="text"
                id="area"
                placeholder="Ingresa la abreviación del area"
              />
            </div>

            <button
              type="submit"
              className="bg-linear-to-r from-gray-800 via-blue-700 to-gray-900 text-white px-4 py-2 rounded-lg flex items-center gap-3 text-sm hover:scale-105 transition-all"
            >
              <IoSaveOutline className="text-lg" />
              Guardar Area
            </button>
          </form>
        </div>
      }
    </section>
  )
}

export default Area