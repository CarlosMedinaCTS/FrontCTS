import { cleanCurrencyString, currencyFormatter } from "@/presentation/utils";
import React, { useState, useEffect } from "react";


const useCurrency = (dataInitial: string = '') => {

    const [value, setValue] = useState(0); // Valor numérico real
    const [display, setDisplay] = useState(dataInitial);


    const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const numeric = parseFloat(input.replace(/[^0-9.,-]/g, '').replace(',', '.'));
        setDisplay(input);
        if (!isNaN(numeric)) setValue(numeric);
    };

    const handleBlurd = () => {
        setDisplay(currencyFormatter(value));
    };

    const handleFocus = () => {
        setDisplay(value.toString());
    };

    useEffect(() => {
        setDisplay(currencyFormatter(value));
    }, []);

    useEffect(() => {
        if (dataInitial) {
            const numericValue = cleanCurrencyString(dataInitial);
            setValue(numericValue);
            setDisplay(currencyFormatter(numericValue));
        }
        
    }, [dataInitial]);


    return {
        display,
        value,
        handleChanges,
        handleBlurd,
        handleFocus
    }
}

export default useCurrency