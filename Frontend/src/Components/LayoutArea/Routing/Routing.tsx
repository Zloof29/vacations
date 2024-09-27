import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import { Page404 } from "../Page404/Page404";
import { Register } from "../../UserArea/Register/Register";
import { Login } from "../../UserArea/Login/Login";
import { VacationList } from "../../VacationArea/VacationList/VacationList";
import { AddVacation } from "../../VacationArea/addVacation/AddVacation";
import { LikedVacation } from "../../VacationArea/LikedVacations/LikedVacation";
import { ActiveVacations } from "../../VacationArea/ActiveVacations/ActiveVacations";
import { InActiveVacations } from "../../VacationArea/InActiveVacations/InActiveVacations";
import { UpdateVacation } from "../../VacationArea/UpdateVacation/UpdateVacation";
import { Report } from "../../VacationArea/Report/Report";

export function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/vacations" element={<VacationList />} />
        <Route path="/likedVacations" element={<LikedVacation />} />
        <Route path="/activeVacations" element={<ActiveVacations />} />
        <Route path="/InActiveVacations" element={<InActiveVacations />} />
        <Route path="/new-vacation" element={<AddVacation />} />
        <Route
          path="/updateVacation/:vacationId"
          element={<UpdateVacation />}
        />
        <Route path="/report" element={<Report />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
