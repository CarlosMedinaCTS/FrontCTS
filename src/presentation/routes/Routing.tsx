import { BrowserRouter, Route, Routes } from "react-router"
import Login from "../modules/auth/inicio-session/views/Login"
import { ToastContainer } from "react-toastify"
import Layout from "../components/layout/Layout"
import Area from "../modules/recursos-humanos/area/views/Area"


const Routing = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route index element={<Login />} />

        <Route path="Inicio" element={<Layout />}>
          <Route index path="recursos/alta-area" element={<Area/>} />
        </Route>

        <Route path="*" element={<Login />} />

      </Routes>

      <ToastContainer />
    </BrowserRouter>

  )
}

export default Routing