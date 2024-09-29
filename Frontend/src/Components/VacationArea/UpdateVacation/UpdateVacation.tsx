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

  const userId = useSelector<AppState, number>((state) => state.user.id);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }
    return date.toISOString().split("T")[0];
  };

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

      setValue("vacationDestination", data.vacationDestination);
      setValue("description", data.description);
      setValue("startDate", formatDate(data.startDate));
      setValue("endDate", formatDate(data.endDate));
      setValue("price", data.price);
      setValue("imageUrl", data.imageUrl);
    };
    vacations();
  }, [userId, setValue]);

  return (
    <div className="updateVacation">
      <form onSubmit={handleSubmit(send)}>
        <label>Vacation destination: </label>
        <input
          type="text"
          {...register("vacationDestination")}
          required
          minLength={3}
          maxLength={50}
        />

        <label>Description: </label>
        <textarea
          rows={10}
          cols={38}
          {...register("description")}
          required
          minLength={5}
          maxLength={1000}
        />

        <label>Start date: </label>
        <input
          type="date"
          {...register("startDate", {
            setValueAs: (value) => formatDate(value),
          })}
          required
        />

        <label>End date: </label>
        <input
          type="date"
          {...register("endDate", {
            setValueAs: (value) => formatDate(value),
          })}
          required
        />

        <label>Price: </label>
        <input
          type="number"
          {...register("price")}
          required
          min={0}
          max={9999}
        />

        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          {...register("imageName")}
          required
        />

        <button className="editButton">EDIT</button>
      </form>
    </div>
  );
}
