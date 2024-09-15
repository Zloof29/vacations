import { useSelector } from "react-redux";
import "./ActiveVacations.css";
import { AppState } from "../../../Redux/store";
import { VacationModel } from "../../../Models/VacationModel";
import { VacationCard } from "../VacationCard/VacationCard";
import { vacationsService } from "../../../Services/VacationsService";

export function ActiveVacations(): JSX.Element {
  const vacations = useSelector<AppState, VacationModel[]>((state) =>
    state.vacations.filter((v) => {
      return (
        new Date(v.startDate) <= new Date() && new Date(v.endDate) >= new Date()
      );
    })
  );

  const userId = useSelector<AppState, number>((state) => state.user.id);

  if (vacations) {
    vacationsService.getAllVacationsByUserId(userId);
  }

  return (
    <div className="ActiveVacations">
      {vacations.map((v) => (
        <VacationCard key={v.id} vacationId={v.id} />
      ))}
    </div>
  );
}
