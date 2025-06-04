import { Typography } from "../../../../components/ui/typography/Typography";
import FormLogin from "../components/Form-Login";
import ImageLogin from "../components/Image-Login";
import logo from "./../../../../assets/logo.png";

const Login = () => {
  return (
    <main className="grid md:grid-cols-2 h-screen font-sans">
      <section className="flex items justify-center items-center">
        <div>
          <img src={logo} alt="Logo" className="w-46 h-10 mb-8 object-cover" />
          <Typography.H2>Inicia Sesion con tu cuenta</Typography.H2>
          <Typography.P>Entra con tu email y contraseña.</Typography.P>
          <FormLogin />
        </div>
      </section>

      <ImageLogin
        url="https://images.unsplash.com/photo-1735825764445-af30f44dc49f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      
    </main>
  )
}

export default Login