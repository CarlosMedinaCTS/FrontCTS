import { useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


const useLogin = () => {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const [valid, setIsValid] = useState({ email: "", password: "" });
    const navigation = useNavigate();

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setIsValid((prev) => ({
            ...prev,
            [name]: value.length === 0 ? "Faltan datos por ingresar" : "",
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.current?.value || !password.current?.value) {
            setIsValid({
                email: !email.current?.value ? "Faltan datos por ingresar" : "",
                password: !password.current?.value ? "Faltan datos por ingresar" : "",
            });
            toast.error("Por favor completa todos los campos.");
            return;
        }
        toast.success("Funcionalidad no implementada");
        navigation("/Inicio");
    };

    return {
        handleBlur,
        handleSubmit,
        email,
        password,
        valid,
        setIsValid,
    }
}

export default useLogin