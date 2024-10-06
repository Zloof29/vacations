import { vacationsService } from "../../../Services/VacationsService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { VacationModel } from "../../../Models/VacationModel";
import { VacationCard } from "../VacationCard/VacationCard";
import usePagination from "../../../hooks/usePagination";
import { UserModel } from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function LikedVacation(): JSX.Element {
  const navigate = useNavigate();
  const userId = useSelector<AppState, number | null>((state) => state.user.id);

  const user = useSelector<AppState, UserModel>((state) => state.user);

  const likedVacations = useSelector<AppState, VacationModel[]>((state) =>
    state.vacations.filter((v) => v.isLiked)
  );

  if (likedVacations) {
    vacationsService.getAllVacationsByUserId(userId);
  }

  const { pageCount, changePage, pageData } = usePagination(likedVacations, 9);

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
