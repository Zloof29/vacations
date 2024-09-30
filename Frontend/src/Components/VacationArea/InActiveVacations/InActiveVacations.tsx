import { useEffect } from "react";
import "./InActiveVacations.css";
import { vacationsService } from "../../../Services/VacationsService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { VacationModel } from "../../../Models/VacationModel";
import { VacationCard } from "../VacationCard/VacationCard";
import usePagination from "../../../hooks/usePagination";

export function InActiveVacations(): JSX.Element {
  const userId = useSelector<AppState, number>((state) => state.user.id);

  const vacations = useSelector<AppState, VacationModel[]>((state) =>
    state.vacations.filter((v) => {
      return new Date(v.startDate) > new Date();
    })
  );

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
