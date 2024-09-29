import { useSelector } from "react-redux";
import "./Report.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { AppState } from "../../../Redux/store";
import { VacationModel } from "../../../Models/VacationModel";
import { useEffect } from "react";
import { vacationsService } from "../../../Services/VacationsService";

export function Report(): JSX.Element {
  const userId = useSelector<AppState, number>((state) => state.user.id);

  const vacations = useSelector<AppState, VacationModel[]>(
    (state) => state.vacations
  );

  const vacationDestination = vacations.map(
    (vacation) => vacation.vacationDestination
  );
  const vacationLikesCounts = vacations.map(
    (vacation) => vacation.likesCount
  );

  useEffect(() => {
    vacationsService.getAllVacationsByUserId(userId);
  }, [userId, vacations]);

  return (
    <div className="Report">
      <BarChart
        xAxis={[
          {
            id: "Vacation destination",
            data: vacationDestination,
            scaleType: "band",
            tickInterval: `auto`,
            tickSize: 10,
            tickPlacement: "middle",
            label: "Vacation Destination",
          },
        ]}
        yAxis={[
          {
            id: "Likes Count",
            label: "like count",
            tickNumber: 1,
          },
        ]}
        series={[
          {
            data: vacationLikesCounts,
            label: "Likes count",
          },
        ]}
        width={1000}
        height={500}
        barLabel={"value"}
      />
    </div>
  );
}
