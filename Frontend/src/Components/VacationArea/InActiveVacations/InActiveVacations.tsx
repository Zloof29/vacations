import { useEffect } from "react";
import "./InActiveVacations.css";
import { vacationsService } from "../../../Services/VacationsService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { VacationModel } from "../../../Models/VacationModel";
import { VacationCard } from "../VacationCard/VacationCard";

export function InActiveVacations(): JSX.Element {
  const userId = useSelector<AppState, number>((state) => state.user.id);

  const vacations = useSelector<AppState, VacationModel[]>((state) =>
    state.vacations.filter((v) => {
      return new Date(v.startDate) > new Date();
    })
  );

  useEffect(() => {
    vacationsService.getAllVacationsByUserId(userId);
  }, []);

  return (
    <div className="InActiveVacations">
      {vacations.map((v) => (
        <VacationCard key={v.id} vacation={v} />
      ))}
    </div>
  );
}
