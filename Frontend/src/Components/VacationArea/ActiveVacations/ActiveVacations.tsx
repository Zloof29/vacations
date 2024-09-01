import { useSelector } from "react-redux";
import "./ActiveVacations.css";
import { AppState } from "../../../Redux/store";
import { VacationModel } from "../../../Models/VacationModel";
import { VacationCard } from "../VacationCard/VacationCard";

export function ActiveVacations(): JSX.Element {
  const vacations = useSelector<AppState, VacationModel[]>((state) =>
    state.vacations.filter((v) => {
      return (
        new Date(v.startDate) <= new Date() && new Date(v.endDate) >= new Date()
      );
    })
  );

  return (
    <div className="ActiveVacations">
      {vacations.map((v) => (
        <VacationCard key={v.id} vacation={v} />
      ))}
    </div>
  );
}
