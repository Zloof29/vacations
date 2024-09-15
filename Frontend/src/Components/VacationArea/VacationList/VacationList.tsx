import { useEffect, useState } from "react";
import "./VacationList.css";
import { VacationCard } from "../VacationCard/VacationCard";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { VacationModel } from "../../../Models/VacationModel";
import { useSelector } from "react-redux";
import { AppState, vacationActions } from "../../../Redux/store";
import { vacationsService } from "../../../Services/VacationsService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";

export function VacationList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  const userId = useSelector<AppState, number>((state) => state.user.id);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    vacationsService
      .getAllVacationsByUserId(userId)
      .then((vacations) => {
        setVacations(vacations);
        const action = vacationActions.initVacations(vacations);
        dispatch(action);
      })
      .catch((err) => {
        notify.error(errorHandler.getError(err));
      });
  }, [userId, dispatch]);

  const handleFilterLikedButton = () => {
    navigate("/likedVacations");
  };

  const handleFilterActiveVacations = () => {
    navigate("/activeVacations");
  };

  const handleFilterInActiveVacations = () => {
    navigate("/InActiveVacations");
  };

  const { pageNumber, pageCount, changePage, pageData } = usePagination(
    vacations,
    9
  );

  return (
    <>
      <div>
        <button onClick={handleFilterLikedButton} className="filterButton">
          Liked vacations
        </button>

        <button onClick={handleFilterActiveVacations} className="filterButton">
          Active vacations
        </button>

        <button
          onClick={handleFilterInActiveVacations}
          className="filterButton"
        >
          InActive Vacations
        </button>
      </div>

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
    </>
  );
}
