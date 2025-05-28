import { BrowserRouter, Route, Routes } from "react-router"
import Home from "../pages/home/Home"


const Routing = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route index element={<Home/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default Routing