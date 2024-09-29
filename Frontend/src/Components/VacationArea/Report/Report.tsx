import { useSelector } from "react-redux";
import "./Report.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { AppState } from "../../../Redux/store";
import { VacationModel } from "../../../Models/VacationModel";
import { useEffect } from "react";
import { vacationsService } from "../../../Services/VacationsService";
import * as XLSX from "xlsx";

export function Report(): JSX.Element {
  const userId = useSelector<AppState, number>((state) => state.user.id);

  const vacations = useSelector<AppState, VacationModel[]>(
    (state) => state.vacations
  );

  const vacationDestination = vacations.map(
    (vacation) => vacation.vacationDestination
  );
  const vacationLikesCounts = vacations.map((vacation) => vacation.likesCount);

  useEffect(() => {
    vacationsService.getAllVacationsByUserId(userId);
  }, [userId, vacations]);

  const generateExcel = () => {
    const data = vacations.map((vacation) => ({
      Destination: vacation.vacationDestination,
      Likes: vacation.likesCount,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vacations");

    XLSX.writeFile(workbook, "vacations.xlsx");
  };

  return (
    <div className="Report">
      <div className="chart-container">
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

      <h1 className="excel-title">Download excel file</h1>
      <button className="excel" onClick={generateExcel}>
        Download Excel
      </button>
    </div>
  );
}
