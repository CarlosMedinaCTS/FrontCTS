import { useState } from "react";

const useValidation = <T extends Record<string, unknown>>(initialState: T) => {
    const [valid, setIsValid] = useState<T>(initialState);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setIsValid((prev) => ({
            ...prev,
            [name]: value.length === 0 ? `El campo ${name} no puede estar vacio` : "",
        }));
    };

    return {
        valid,
        handleBlur,
        setIsValid,
    };
};

export default useValidation;