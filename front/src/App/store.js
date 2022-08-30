import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "../features/cars/carsSlice";
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
    reducer: { cars: carsReducer,users:usersReducer},
});
