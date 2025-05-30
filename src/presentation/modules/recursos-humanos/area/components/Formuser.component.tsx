import { IoSaveOutline } from "react-icons/io5"
import Input from "../../../../components/ui/Input"
import Button from "../../../../components/ui/Button"


const FormuserComponent = () => {
    return (
        <>

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


                <Button>
                    <IoSaveOutline className="text-lg" />
                    Guardar Area
                </Button>

            </form>
        </>
    )
}

export default FormuserComponent