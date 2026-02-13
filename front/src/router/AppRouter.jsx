import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Buy from "../pages/Buy/Buy";
import Rent from "../pages/Rent/Rent";
import Sell from "../pages/Sell/Sell";
import Favourite from "../pages/Favourite/Favourite";
import SaveSearch from "../pages/SaveSearch/SaveSearch";
import HouseDetail from "../pages/HouseDetail/HouseDetail";
import NotFound from "../pages/NotFound/NotFound";
import CityResults from "../pages/CityResults/CityResults";
import NeighborhoodResults from "../pages/NeighborhoodResults/NeighborhoodResults";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Register />} />
        <Route path="/comprar" element={<Buy />} />
        <Route path="/alquilar" element={<Rent />} />

        <Route path="/:tipo/:ciudad" element={<CityResults />} />
        <Route path="/:tipo/:ciudad/:barrio" element={<NeighborhoodResults />} />
        <Route path="/vivienda/:tipo/:ciudad/:barrio/:id" element={<HouseDetail />} />

        <Route path="/busquedas" element={<SaveSearch />} />
        <Route path="/favoritos" element={<Favourite />} />
        <Route path="/vender" element={<Sell />} />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter