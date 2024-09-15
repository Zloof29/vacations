import { useEffect, useState } from "react";
import { vacationsService } from "../../../Services/VacationsService";
import { useSelector } from "react-redux";
import { AppState, vacationActions } from "../../../Redux/store";
import { VacationModel } from "../../../Models/VacationModel";
import { VacationCard } from "../VacationCard/VacationCard";

export function LikedVacation(): JSX.Element {
  const userId = useSelector<AppState, number>((state) => state.user.id);

  const likedVacations = useSelector<AppState, VacationModel[]>((state) =>
    state.vacations.filter((v) => v.isLiked)
  );

  if (likedVacations) {
    vacationsService.getAllVacationsByUserId(userId);
  }

  return (
    <div>
      <div>
        {likedVacations.map((v) => (
          <VacationCard key={v.id} vacationId={v.id} />
        ))}
      </div>
    </div>
  );
}
