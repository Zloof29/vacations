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
import usePagination from "../../../hooks/usePagination";
import { UserModel } from "../../../Models/UserModel";

export function VacationList(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  const userInformation = useSelector<AppState, UserModel>(
    (state) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    vacationsService
      .getAllVacationsByUserId(userInformation.id)
      .then((vacations) => {
        setVacations(vacations);
        const action = vacationActions.initVacations(vacations);
        dispatch(action);
      })
      .catch((err) => {
        notify.error(errorHandler.getError(err));
      });
  }, [userInformation.id, dispatch]);

  const { pageNumber, pageCount, changePage, pageData } = usePagination(
    vacations,
    9
  );

  return (
    <>
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
