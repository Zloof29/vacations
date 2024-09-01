import axios, { AxiosRequestConfig } from "axios";
import { appConfig } from "../Utils/AppConfig";
import { VacationModel } from "../Models/VacationModel";
import { likeAction, store, vacationActions } from "../Redux/store";
import { LikeModel } from "../Models/LikeModel";

class VacationsService {
  public async getAllVacationsByUserId(userId: number) {
    const response = await axios.get<VacationModel[]>(
      appConfig.vacationsUrl + userId
    );

    const vacations = response.data;

    const action = vacationActions.initVacations(vacations);
    store.dispatch(action);

    return vacations;
  }

  public async getAllVacationUserLiked(userId: number) {
    const response = await axios.get<VacationModel[]>(
      appConfig.likedVacationsUrl + userId
    );

    const vacations = response.data;

    const action = vacationActions.likedVacations(vacations);
    store.dispatch(action);

    return vacations;
  }

  public async addVacation(vacation: VacationModel) {
    const options: AxiosRequestConfig = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const response = await axios.post<VacationModel>(
      appConfig.addVacationsUrl,
      vacation,
      options
    );

    const addedVacation = response.data;

    const action = vacationActions.addVacation(addedVacation);
    store.dispatch(action);

    return vacation;
  }

  public async addLikeToVacation(
    like: LikeModel,
    userId: number,
    vacationId: number
  ) {
    const options: AxiosRequestConfig = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const response = await axios.post<LikeModel>(
      `${appConfig.addLikeUrl}${userId}/${vacationId}`,
      like,
      options
    );

    const addedLike = response.data;

    const action = likeAction.likedVacation([addedLike]);
    store.dispatch(action);

    console.log(action);

    return like;
  }

  public async deleteVacationLike(userId: number, vacationId: number) {
    const response = await axios.delete<LikeModel>(
      `${appConfig.deleteLike}${userId}/${vacationId}`
    );

    const deletedVacationLike = response.data;

    const action = likeAction.deletedVacationLike(deletedVacationLike);
    store.dispatch(action);

    console.log(action);
  }
}

export const vacationsService = new VacationsService();
