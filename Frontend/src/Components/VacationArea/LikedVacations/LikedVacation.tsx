import { useEffect, useState } from "react";
import { vacationsService } from "../../../Services/VacationsService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { VacationModel } from "../../../Models/VacationModel";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { VacationCard } from "../VacationCard/VacationCard";

export function LikedVacation(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  const userId = useSelector<AppState, number>((state) => state.user.id);

  useEffect(() => {
    vacationsService
      .getAllVacationUserLiked(userId)
      .then((vacations) => setVacations(vacations))
      .catch((error: any) => notify.error(errorHandler.getError(error)));
  }, [userId]);

  return (
    <div>
      <div>
        {vacations && vacations.length > 0 ? (
          vacations.map((v) => <VacationCard key={v.id} vacation={v} />)
        ) : (
          <p>No liked vacations found.</p>
        )}
      </div>
    </div>
  );
}
