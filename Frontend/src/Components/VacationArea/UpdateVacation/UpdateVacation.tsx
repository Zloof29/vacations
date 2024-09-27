import { useForm } from "react-hook-form";
import "./UpdateVacation.css";
import { VacationModel } from "../../../Models/VacationModel";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { vacationsService } from "../../../Services/VacationsService";
import { AppState } from "../../../Redux/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export function UpdateVacation(): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<VacationModel>();

  const navigate = useNavigate();

  const { vacationId } = useParams();

  const [vacationData, setVacationData] = useState<VacationModel>(null);

  const userId = useSelector<AppState, number>((state) => state.user.id);

  async function send(vacation: VacationModel) {
    try {
      vacation.imageName = (vacation.imageName as unknown as FileList)[0];
      await vacationsService.updateVacation(vacation, +vacationId);
      notify.success("Vacation has been updated.");
      navigate("/vacations");
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  }

  useEffect(() => {
    const vacations = async () => {
      const data: VacationModel = await vacationsService.getVacationById(
        +vacationId
      );

      setVacationData(data);

      setValue("vacationDestination", data.vacationDestination);
      setValue("description", data.description);
      setValue("startDate", data.startDate);
      setValue("endDate", data.endDate);
      setValue("price", data.price);
      setValue("imageUrl", data.imageUrl);
    };
    vacations();
  }, [userId, setValue]);

  return (
    <div className="updateVacation">
      <form onSubmit={handleSubmit(send)}>
        <label>Vacation Destination: </label>
        <input type="text" {...register("vacationDestination")} required />

        <label>description: </label>
        <textarea rows={10} cols={38} {...register("description")} required />

        <label>start Date: </label>
        <input type="datetime-local" {...register("startDate")} required />

        <label>end Date: </label>
        <input type="datetime-local" {...register("endDate")} required />

        <label>price: </label>
        <input type="number" {...register("price")} required />

        <label>image:</label>
        <input
          type="file"
          accept="image/*"
          {...register("imageName")}
          required
        />

        <button>EDIT</button>
      </form>
    </div>
  );
}
