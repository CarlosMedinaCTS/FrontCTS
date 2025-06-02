import { BrowserRouter, Route, Routes } from "react-router"
import Login from "../modules/auth/inicio-session/views/Login"
import { ToastContainer } from "react-toastify"
import Layout from "../components/layout/Layout"
import Altas from "../modules/recursos-humanos/altas/View/Altas"
import Productividad from "../modules/dashboard/productividad/views/Productividad"
import Empleado from "../modules/recursos-humanos/empleado/views/Empleado"


const Routing = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route index element={<Login />} />

        <Route path="Inicio" element={<Layout />}  >
          <Route path="dashboard/reporte" element={<Productividad />} />
          <Route path="recursos/alta-area" element={<Altas />} />
          <Route path="recursos/empleados" element={<Empleado />} />
        </Route>

        <Route path="*" element={<Login />} />

      </Routes>

      <ToastContainer />
    </BrowserRouter>

  )
}

export default Routing