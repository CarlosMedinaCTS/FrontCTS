import FormSchema from "../../../../components/ui/form/FormSchema"
import { Typography } from "../../../../components/ui/typography/Typography"
import { schema } from "../schemas/altaArea.Schema"


const FormuserComponent = () => {
    return (
        <>
        
            <Typography.P className="text-xs text-gray-500 my-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque beatae consequatur sint, id sunt laudantium perspiciatis adipisci fugiat culpa alias.</Typography.P>
            <hr className="border border-gray-100 my-4" /> 

            <FormSchema
                schema={schema}
            />
        </>
    )
}

export default FormuserComponent