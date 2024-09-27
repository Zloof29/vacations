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

  const vacationNames: string[] = vacations.map(
    (vacation) => vacation.vacationDestination
  );
  const vacationCounts: number[] = vacations.map(
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
            id: "Vacation name",
            data: vacationNames,
            scaleType: "band",
            disableTicks: false,
            tickInterval: `auto`,
            tickSize: 10,
            tickPlacement: "middle",
          },
        ]}
        series={[
          {
            data: vacationCounts,
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
