import { useSelector } from "react-redux";
import "./ActiveVacations.css";
import { AppState } from "../../../Redux/store";
import { VacationModel } from "../../../Models/VacationModel";
import { VacationCard } from "../VacationCard/VacationCard";
import { vacationsService } from "../../../Services/VacationsService";
import usePagination from "../../../hooks/usePagination";

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

  const { pageCount, changePage, pageData } = usePagination(vacations, 9);

  return (
    <div>
      <ul>
        {pageData().map((vacation: VacationModel) => (
          <VacationCard key={vacation.id} vacationId={vacation.id} />
        ))}
      </ul>
      <div>
        {Array.from({ length: pageCount }, (_, index) => (
          <button key={index} onClick={() => changePage(index)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
