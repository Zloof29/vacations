import { Action, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";
import { VacationModel } from "../Models/VacationModel";
import { LikeModel } from "../Models/LikeModel";

// npm i react-redux @types/react-redux @reduxjs/toolkit

// Init all products
export function initVacations(
  currentState: VacationModel[],
  action: PayloadAction<VacationModel[]>
) {
  const newState: VacationModel[] = action.payload; // Here, action.payload is all products to init.
  return newState;
}

export function likedVacations(
  currentState: VacationModel[],
  action: PayloadAction<VacationModel[]>
) {
  const newState: VacationModel[] = action.payload;
  return newState;
}

// Add product:
export function addVacation(
  currentState: VacationModel[],
  action: PayloadAction<VacationModel>
) {
  const newState: VacationModel[] = [...currentState];
  newState.push(action.payload); // Here, action.payload is a product to add.
  return newState;
}

export function initUser(
  currentState: UserModel,
  action: PayloadAction<UserModel>
) {
  const newState: UserModel = action.payload;
  return newState;
}

export function logoutUser(currentState: UserModel, action: Action) {
  const newState: UserModel = null;
  return newState;
}

export function likedVacation(
  currentState: LikeModel[],
  action: PayloadAction<LikeModel[]>
) {
  const newState: LikeModel[] = action.payload;
  return newState;
}

export function deletedVacationLike(
  currentState: LikeModel[],
  action: PayloadAction<LikeModel>
) {
  const validState = currentState || [];
  const newState = validState.filter((like) => like.id !== action.payload.id);
  return newState;
}
