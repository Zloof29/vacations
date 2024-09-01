import { VacationModel } from "../../../Models/VacationModel";
import "./VacationCard.css";
import { format } from "date-fns";
import { AppState, likeAction, vacationActions } from "../../../Redux/store";
import { useSelector } from "react-redux";
import { vacationsService } from "../../../Services/VacationsService";
import { LikeModel } from "../../../Models/LikeModel";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { useEffect, useState } from "react";

type VacationCardProps = {
  vacation: VacationModel;
};

export function VacationCard(props: VacationCardProps): JSX.Element {
  const [isLiked, setIsLiked] = useState<boolean>(
    Boolean(props.vacation.isLiked)
  );
  const [likeCount, setLikeCount] = useState<number>(props.vacation.likesCount);

  const userId = useSelector<AppState, number>((state) => state.user.id);

  const vacationId = useSelector<AppState, number>((state) => {
    const vacation = state.vacations.find((v) => v.id === props.vacation.id);
    return vacation ? vacation.id : undefined;
  });

  const handleLikeButton = async () => {
    try {
      if (isLiked) {
        await vacationsService.deleteVacationLike(userId, vacationId);
        setIsLiked(false);
        setLikeCount(likeCount - 1);
        notify.success("Like has been removed.");
      } else {
        await vacationsService.addLikeToVacation(
          new LikeModel(),
          userId,
          vacationId
        );
        setIsLiked(true);
        setLikeCount(likeCount + 1);
        notify.success("Like has been added.");
      }
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  };

  useEffect(() => {
    setIsLiked(Boolean(props.vacation.isLiked));
    setLikeCount(props.vacation.likesCount);
  }, [props.vacation.isLiked, props.vacation.likesCount]);

  return (
    <div className="VacationCard">
      <div>
        <div className="image-container">
          <img src={props.vacation.imageUrl} />
          <button className="like-button" onClick={handleLikeButton}>
            ❤️ {isLiked ? "Unlike" : "Like"} {likeCount}
          </button>
          <span className="vacation-destination">
            {props.vacation.vacationDestination}
          </span>
        </div>
        <div className="vacation-date">
          <span className="vacation-date">
            📅
            {format(new Date(props.vacation.startDate), "dd MMMM, yyyy")} -
            {format(new Date(props.vacation.endDate), "dd MMMM, yyyy")}
          </span>
        </div>
        <div className="description">
          <span>{props.vacation.description}</span>
        </div>
        <span className="price">{props.vacation.price}$</span>
      </div>
    </div>
  );
}
