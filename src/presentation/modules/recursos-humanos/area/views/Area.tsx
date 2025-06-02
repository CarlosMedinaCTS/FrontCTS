import "driver.js/dist/driver.css";
import { IoSaveOutline } from "react-icons/io5";
import Popover from "../../../../components/data-display/Popover";
import Table from "../../../../components/data-display/Table";
import Button from "../../../../components/ui/buttons/Button";
import useToggle from "../../../../hooks/ui/useToggle";
import FormuserComponent from "../components/Formuser.component";


const Area = () => {
  const { isToggled, handleToggle } = useToggle();

  return (
    <section className=" bg-white relative">
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


          <Button
            onClick={handleToggle}
          >
            <IoSaveOutline className="text-lg" />
            <span>Alta de Area</span>
          </Button>

        </div>

        <Table
          columns={[
            { key: 'id', label: 'ID', className: 'px-6 py-3' },
            { key: 'name', label: 'Nombre del Area', className: 'px-6 py-3' },
            { key: 'abbreviation', label: 'Abreviación', className: 'px-6 py-3' },
            {
              key: 'actions',
              label: 'Acciones',
              className: 'px-6 py-3',
              render: () => (
                <div className="flex items-center gap-2">
                  <button className="text-blue-500 hover:text-blue-700">Editar</button>
                  <button className="text-red-500 hover:text-red-700">Eliminar</button>
                </div>
              )
            }
          ]}
          data={[
            { id: 1, name: 'Recursos Humanos', abbreviation: 'RH' },
            { id: 2, name: 'Finanzas', abbreviation: 'FIN' },
            { id: 3, name: 'Marketing', abbreviation: 'MKT' }
          ]}
          page={1}
          totalPages={1}
          onPageChange={() => { }}

        />
      </div>

     

      {
        isToggled &&
        <Popover
          title="Alta de Area"
          onClose={handleToggle}
        >
          <FormuserComponent />
        </Popover>
      }
    </section>
  )
}

export default Area