import Button from "../../../../components/ui/Button";
import useLogin from "../../../../hooks/auth/useLogin";
import FormField from "./Form-Field";


const emailIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
    </svg>
);

const passwordIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
);


const FormLogin = () => {
   const { email, password, handleBlur, handleSubmit, valid } = useLogin()

    return (
        <form onSubmit={handleSubmit} action="" className=" my-5 flex flex-col gap-4">

            <FormField
                icon={emailIcon}
                inputRef={email}
                inputProps={{
                    type: "email",
                    name: "email",
                    placeholder: "Ingresa tu correo electrónico",
                    onBlur: handleBlur,
                   
                }}
                error={valid.email}
            />

            <FormField
                icon={passwordIcon}
                inputRef={password}
                inputProps={{
                    type: "password",
                    name: "password",
                    placeholder: "Ingresa tu contraseña",
                    onBlur: handleBlur,
                }}
                error={valid.password}
            />

            <div className="w-full flex justify-end">
                <p className="text-xs text-left text-primary underline">¿Olvidaste tu contraseña?</p>
            </div>


            <Button
                type="submit"
                style={{textAlign : 'center'}}
                disabled={valid.email || valid.password ? true : false}
            >
                Iniciar Sesion
            </Button>

        </form>
    )
}

export default FormLogin