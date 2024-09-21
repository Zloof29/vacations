import { useEffect, useState } from "react";
import { vacationsService } from "../../../Services/VacationsService";
import { useSelector } from "react-redux";
import { AppState, vacationActions } from "../../../Redux/store";
import { VacationModel } from "../../../Models/VacationModel";
import { VacationCard } from "../VacationCard/VacationCard";
import usePagination from "../../../hooks/usePagination";

export function LikedVacation(): JSX.Element {
  const userId = useSelector<AppState, number>((state) => state.user.id);

  const likedVacations = useSelector<AppState, VacationModel[]>((state) =>
    state.vacations.filter((v) => v.isLiked)
  );

  if (likedVacations) {
    vacationsService.getAllVacationsByUserId(userId);
  }

  const { pageNumber, pageCount, changePage, pageData } = usePagination(
    likedVacations,
    9
  );

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
