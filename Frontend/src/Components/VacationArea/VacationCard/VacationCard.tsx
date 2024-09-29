import { errorHandler } from "../../../Utils/ErrorHandler";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState, store, vacationActions } from "../../../Redux/store";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/notify";
import { format } from "date-fns";
import "./VacationCard.css";
import { UserModel } from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";

export function VacationCard({
  vacationId,
}: {
  vacationId: number;
}): JSX.Element {
  const navigate = useNavigate();

  const vacation = useSelector<AppState, VacationModel | undefined>((state) =>
    state.vacations.find((v) => v.id === vacationId)
  );

  const userInformation = useSelector<AppState, UserModel>(
    (state) => state.user
  );

  const [isLiked, setIsLiked] = useState<boolean>(vacation?.isLiked);
  const [likeCount, setLikeCount] = useState<number>(vacation?.likesCount || 0);

  useEffect(() => {
    vacationsService.getAllVacationsByUserId(userInformation.id);
  }, [userInformation.id, isLiked]);

  const handleLikeButton = async () => {
    try {
      await vacationsService.deleteVacationLike(userInformation.id, vacationId);
      setIsLiked(false);
      setLikeCount(likeCount - 1);
      notify.success("Like has been removed.");
    } catch (error) {
      notify.error(errorHandler.getError(error));
    }
  };

  const handleUnlikeButton = async () => {
    try {
      await vacationsService.addLikeToVacation(
        new VacationModel(),
        userInformation.id,
        vacationId
      );
      setIsLiked(true);
      setLikeCount(likeCount + 1);
      notify.success("Like has been added.");
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  };

  const handleDeleteButton = async () => {
    try {
      await vacationsService.deleteVacation(vacation.id);
      notify.success("Vacation has been removed.");
      const actionVacation = vacationActions.deletedVacation(vacation);
      store.dispatch(actionVacation);
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  };

  const handleEditButton = async () => {
    try {
      navigate(`/updateVacation/${vacationId}`);
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  };

  if (!vacation) {
    return <></>;
  }

  return (
    <div className="VacationCard">
      <div>
        <div className="image-container">
          <img src={vacation.imageUrl} />
          {userInformation.roleId === 1 ? (
            <>
              <button className="delete-button" onClick={handleDeleteButton}>
                Delete
              </button>
              <button className="edit-button" onClick={handleEditButton}>
                Edit
              </button>
            </>
          ) : (
            <button
              className="like-button"
              onClick={vacation.isLiked ? handleLikeButton : handleUnlikeButton}
            >
              ❤️ {vacation.isLiked ? "Unlike" : "Like"} {vacation.likesCount}
            </button>
          )}
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
