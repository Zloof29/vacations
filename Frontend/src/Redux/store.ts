import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
  addVacation,
  deletedVacationLike,
  initUser,
  initVacations,
  likedVacation,
  likedVacations,
  logoutUser,
} from "./reducers";
import { UserModel } from "../Models/UserModel";
import { VacationModel } from "../Models/VacationModel";
import { LikeModel } from "../Models/LikeModel";

// Application state:
export type AppState = {
  vacations: VacationModel[];
  user: UserModel;
  like: LikeModel[];
};

// Creating products slice:
const vacationSlice = createSlice({
  name: "vacations", // Internal use
  initialState: [],
  reducers: { initVacations, addVacation, likedVacations },
});

// Create user slice:
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: { initUser, logoutUser },
});

const likeSlice = createSlice({
  name: "like",
  initialState: null,
  reducers: { likedVacation, deletedVacationLike },
});

// Creating action creators:
export const vacationActions = vacationSlice.actions;
export const userActions = userSlice.actions;
export const likeAction = likeSlice.actions;

// Main redux object:
export const store = configureStore<AppState>({
  reducer: {
    vacations: vacationSlice.reducer, // Product state.
    user: userSlice.reducer, // User state.
    like: likeSlice.reducer, // like state.
  },
});
