import { errorHandler } from "../../../Utils/ErrorHandler";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/notify";
import { format } from "date-fns";
import "./VacationCard.css";

export function VacationCard({
  vacationId,
}: {
  vacationId: number;
}): JSX.Element {
  const vacation = useSelector<AppState, VacationModel | undefined>((state) =>
    state.vacations.find((v) => v.id === vacationId)
  );

  const userId = useSelector<AppState, number>((state) => state.user.id);

  const [isLiked, setIsLiked] = useState<boolean>(vacation?.isLiked);
  const [likeCount, setLikeCount] = useState<number>(vacation?.likesCount || 0);

  useEffect(() => {
    vacationsService.getAllVacationsByUserId(userId);
  }, [userId, isLiked]);

  const handleLikeButton = async () => {
    try {
      if (isLiked) {
        await vacationsService.deleteVacationLike(userId, vacationId);
        setIsLiked(false);
        setLikeCount(likeCount - 1);
      } else {
        await vacationsService.addLikeToVacation(
          new VacationModel(),
          userId,
          vacationId
        );
        setIsLiked(true);
        setLikeCount(likeCount + 1);
      }
    } catch (error) {
      notify.error(errorHandler.getError(error));
    }
  };

  if (!vacation) {
    return <div>Vacation not found</div>;
  }

  return (
    <div className="VacationCard">
      <div>
        <div className="image-container">
          <img src={vacation.imageUrl} />
          <button className="like-button" onClick={handleLikeButton}>
            ❤️ {vacation.isLiked ? "Unlike" : "Like"} {vacation.likesCount}
          </button>
          <span className="vacation-destination">
            {vacation.vacationDestination}
          </span>
        </div>
        <div className="vacation-date">
          <span className="vacation-date">
            📅
            {format(new Date(vacation.startDate), "dd MMMM, yyyy")} -
            {format(new Date(vacation.endDate), "dd MMMM, yyyy")}
          </span>
        </div>
        <div className="description">
          <span>{vacation.description}</span>
        </div>
        <span className="price">{vacation.price}$</span>
      </div>
    </div>
  );
}
