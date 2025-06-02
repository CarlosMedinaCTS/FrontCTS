import Form from "@rjsf/core";
import type { RJSFSchema, UiSchema, WidgetProps } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Input from "../inputs/Input";
import Button from "../buttons/Button";

interface ReusableFormProps {
    schema: RJSFSchema;
    onSubmit?: (data: any) => void;
    onChange?: (data: any) => void;
    onError?: (errors: any) => void;
}

const generateUiSchema = (schema: RJSFSchema): UiSchema => {
    const uiSchema: UiSchema = {};
    if (schema.properties) {
        Object.entries(schema.properties).forEach(([key, value]) => {
            if (typeof value === "object" && value !== null && "type" in value) {
                // Campo tipo select (enum)
                if ("enum" in value && Array.isArray(value.enum)) {
                    uiSchema[key] = {
                        "ui:widget": (props: WidgetProps) => (
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {value.title || key}
                                </label>
                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    value={props.value ?? ""}
                                    required={props.required}
                                    onChange={e => props.onChange(e.target.value)}
                                >
                                    <option value="">Selecciona una opción</option>
                                    {(value.enum as Array<string | number | boolean | null>).map((option) => (
                                        <option
                                            key={option === null ? "null" : String(option)}
                                            value={option === null ? "" : String(option)}
                                        >
                                            {option === null || option === "" ? "Ninguno" : String(option)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ),
                        "ui:options": { label: false },
                    };
                } else {
                    // Otros tipos
                    switch (value.type) {
                        case "string":
                            uiSchema[key] = {
                                "ui:widget": (props: WidgetProps) => (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {value.title || key}
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder={value.title ? `Ingresa ${String(value.title).toLowerCase()}` : ""}
                                            value={props.value || ""}
                                            required={props.required}
                                            onChange={e => props.onChange(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                    </div>
                                ),
                                "ui:options": { label: false },
                            };
                            break;
                        case "number":
                        case "integer":
                            uiSchema[key] = {
                                "ui:widget": (props: WidgetProps) => (
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {value.title || key}
                                        </label>
                                        <Input
                                            type="number"
                                            placeholder={value.title ? `Ingresa ${String(value.title).toLowerCase()}` : ""}
                                            value={props.value ?? ""}
                                            required={props.required}
                                            onChange={e => {
                                                const val = e.target.value;
                                                props.onChange(val === "" ? undefined : Number(val));
                                            }}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                    </div>
                                ),
                                "ui:options": { label: false },
                            };
                            break;
                        // Puedes agregar más tipos aquí si lo necesitas
                    }
                }
            }
        });
    }
    return uiSchema;
};

const FormSchema: React.FC<ReusableFormProps> = ({
    schema,
    onSubmit,
    onChange,
    onError,
}) => {
    const uiSchema = generateUiSchema(schema);

    
const CustomButtonTemplates = {
  SubmitButton: (props: any) => (
    <Button
      type="submit"
      disabled={props.disabled}
    >
      Guardar Cambios
    </Button>
  ),
};

    return (
        <Form
            schema={schema}
            uiSchema={uiSchema}
            validator={validator}
            onSubmit={onSubmit}
            onChange={onChange}
            onError={onError}
            templates={{ ButtonTemplates: CustomButtonTemplates }}
        />
    );
};

export default FormSchema;