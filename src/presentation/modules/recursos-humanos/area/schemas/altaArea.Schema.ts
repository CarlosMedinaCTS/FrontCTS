import type { RJSFSchema } from "@rjsf/utils";

export const schema: RJSFSchema = {
    type: "object",
    properties: {
        "Nombre de area": { type: "string", title: "Nombre de área" },
        "Abreviación": { type: "string", title: "Abreviación" }
    }
};