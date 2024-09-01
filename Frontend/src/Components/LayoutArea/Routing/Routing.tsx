import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import { Home } from "../../HomeArea/Home/Home";
import { About } from "../../AboutArea/About/About";
import { Page404 } from "../Page404/Page404";
import { Register } from "../../UserArea/Register/Register";
import { Login } from "../../UserArea/Login/Login";
import { VacationList } from "../../VacationArea/VacationList/VacationList";
import { AddVacation } from "../../VacationArea/addVacation/AddVacation";
import { LikedVacation } from "../../VacationArea/LikedVacations/LikedVacation";
import { ActiveVacations } from "../../VacationArea/ActiveVacations/ActiveVacations";

export function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/vacations" element={<VacationList />} />
        <Route path="/likedVacations" element={<LikedVacation />} />
        <Route path="/activeVacations" element={<ActiveVacations />} />
        <Route path="/about" element={<About />} />
        <Route path="/new-vacation" element={<AddVacation />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
