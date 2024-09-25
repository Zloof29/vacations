import axios, { AxiosRequestConfig } from "axios";
import { appConfig } from "../Utils/AppConfig";
import { VacationModel } from "../Models/VacationModel";
import { likeAction, store, vacationActions } from "../Redux/store";
import { LikeModel } from "../Models/LikeModel";

class VacationsService {
  public async getAllVacationsByUserId(userId: number) {
    const response = await axios.get<VacationModel[]>(
      appConfig.vacationsByUserIdUrl + userId
    );

    const vacations = response.data;

    const action = vacationActions.initVacations(vacations);
    store.dispatch(action);

    return vacations;
  }

  public async getVacationById(vacationId: number) {
    const response = await axios.get<VacationModel>(
      appConfig.vacationUrl + vacationId
    );

    console.log(response.data);

    return response.data;

    // const action = vacationActions.initVacations(vacations);
    // store.dispatch(action);

    // return vacation;
  }

  public async getAllVacationUserLiked(userId: number) {
    const response = await axios.get<VacationModel[]>(
      appConfig.likedVacationsUrl + userId
    );

    const vacations = response.data;

    const action = vacationActions.likedVacations(vacations);
    store.dispatch(action);

    console.log(action);

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

  public async updateVacation(vacation: VacationModel, vacationId: number) {
    const options: AxiosRequestConfig = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    const response = await axios.put(
      appConfig.vacationUrl + vacationId,
      vacation,
      options
    );

    const updatedVacation = response.data;

    return updatedVacation;
  }

  public async deleteVacation(vacationId: number) {
    const response = await axios.delete<void>(
      appConfig.deleteVacationUrl + vacationId
    );

    if (response.status === 200) {
      const action = vacationActions.deletedVacation();
      store.dispatch(action);
      return true;
    } else {
      return false;
    }
  }

  public async addLikeToVacation(
    like: VacationModel,
    userId: number,
    vacationId: number
  ) {
    const options: AxiosRequestConfig = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const response = await axios.post<VacationModel>(
      `${appConfig.addLikeUrl}${userId}/${vacationId}`,
      like,
      options
    );

    const addedLike = response.data;

    const action = vacationActions.likedVacations([addedLike]);
    store.dispatch(action);

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
