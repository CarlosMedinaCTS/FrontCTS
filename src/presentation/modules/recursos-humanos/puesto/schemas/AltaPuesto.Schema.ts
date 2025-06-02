import type { RJSFSchema } from "@rjsf/utils";

export const schema: RJSFSchema = {
    type: "object",
    properties: {
        "Nombre de Puesto": { type: "string", title: "Nombre de puesto" },
        "Salario": { type: "number", title: "Salario" },
        "Departamento": {
            type: "string",
            title: "Departamento",
            enum: ["RH", "Finanzas", "Marketing", "TI"]
        }
    }
};