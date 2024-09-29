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

  function cancelEdit() {
    navigate("/vacations");
  }

  return (
    <div className="addVacation">
      <form onSubmit={handleSubmit(send)}>
        <label>Vacation Destination: </label>
        <input type="text" {...register("vacationDestination")} required />

        <label>Description: </label>
        <textarea rows={10} cols={38} {...register("description")} required />

        <label>Start Date: </label>
        <input type="date" {...register("startDate")} required />

        <label>End Date: </label>
        <input type="date" {...register("endDate")} required />

        <label>Price: </label>
        <input type="number" {...register("price")} required />

        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          {...register("imageName")}
          required
        />

        <button className="addVacationButton">Add</button>
        <button className="cancelButton" onClick={cancelEdit}>
          Cancel
        </button>
      </form>
    </div>
  );
}
