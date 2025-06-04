import { CiCircleAlert } from "react-icons/ci";
import { Typography } from "../ui/typography/Typography";
interface Props {
    closeModal : () => void
    handleAction : () => void
    values : string
}
const Alert = ({closeModal, handleAction, values} : Props) => {
    return (
        <div className="">
            {/* Icono de advertencia */}
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <CiCircleAlert className="text-3xl text-red-400"/>
            </div>

            {/* Título */}
            <Typography.H2 className="text-center font-normal text-lg">¿Confirmar eliminación?</Typography.H2>
            {/* Mensaje de advertencia */}
            <div className="text-center mb-6">
                <Typography.P className="mb-3">Estás a punto de eliminar:</Typography.P>
                <p className="font-medium text-gray-900 bg-gray-50 px-3 py-2 rounded-md">{values}</p>
                <p className="text-sm text-red-600 mt-3">
                    <strong>¡Atención!</strong> Esta acción no se puede deshacer.
                </p>
            </div>

            
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={closeModal}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                    Cancelar
                </button>
                <button
                    onClick={handleAction}
                    className="flex-1 bg-red-400 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Sí, eliminar
                </button>
            </div>
        </div>
    )
}

export default Alert