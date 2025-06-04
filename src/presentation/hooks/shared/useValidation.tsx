import { useState } from "react";

interface ValidationConfig {
    min?: number;
    max?: number;
}

type ValidationMap<T> = {
    [K in keyof T]: ValidationConfig;
};

const useValidation = <T extends Record<string, unknown>>(
    initialState: T,
    config: ValidationMap<T>
) => {
    const [valid, setIsValid] = useState<T>(initialState);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const { min, max } = config[name as keyof T] || {};
        let error = "";

        if (value.length === 0) {
            error = `El campo ${name} no puede estar vacío`;
        } else if (min && value.length < min) {
            error = `El campo ${name} debe tener al menos ${min} caracteres`;
        } else if (max && value.length > max) {
            error = `El campo ${name} debe tener máximo ${max} caracteres`;
        }

        setIsValid((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    return {
        valid,
        handleBlur,
        setIsValid,
    };
};

export default useValidation;