import { useForm } from "react-hook-form";
import "./AddVacation.css";
import { VacationModel } from "../../../Models/VacationModel";
import { useNavigate } from "react-router-dom";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { vacationsService } from "../../../Services/VacationsService";

export function AddVacation(): JSX.Element {
  const { register, handleSubmit } = useForm<VacationModel>();
  const navigate = useNavigate();

  async function send(vacation: VacationModel) {
    try {
      vacation.imageName = (vacation.imageName as unknown as FileList)[0];
      await vacationsService.addVacation(vacation);
      notify.success("Vacation has been added.");
      navigate("/vacations");
    } catch (err: any) {
      notify.error(errorHandler.getError(err));
    }
  }

  return (
    <div className="addVacation">
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

        <button className="addVacationButton">ADD</button>
      </form>
    </div>
  );
}
