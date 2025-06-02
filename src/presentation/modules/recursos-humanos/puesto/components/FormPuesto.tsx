import FormSchema from "../../../../components/ui/form/FormSchema"
import { schema } from "../schemas/AltaPuesto.Schema"


const FormPuesto = () => {
    return (
        <>

            <p className="text-xs text-gray-500 my-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque beatae consequatur sint, id sunt laudantium perspiciatis adipisci fugiat culpa alias.</p>
            <hr className="border border-gray-100 my-4" />

            <FormSchema
                schema={schema}
            />
        </>
    )
}

export default FormPuesto