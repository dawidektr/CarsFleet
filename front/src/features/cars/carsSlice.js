import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "axios";



const carsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.id - b.id,
});

const initialState = carsAdapter.getInitialState({
    status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
});

export const fetchCars = createAsyncThunk("api/cars", async () => {
    const response = await axios.get("http://localhost:8080/api/cars");
    return response.data;
});

export const addNewCar = createAsyncThunk("api/addCar", async (data) => {
    const response = await axios.post("http://localhost:8080/api/cars", data);
    return response.data;
});

export const updateCar = createAsyncThunk("api/cars/:id", async (data) => {
    const response = await axios.put(
        `http://localhost:8080/api/cars/${data.id}`,
        data
    );
    return response.data;
});

export const deleteCar = createAsyncThunk("api/deleteCar/", async (data) => {
    const response = await axios.delete(
        `http://localhost:8080/api/cars/${data.id}`
    );
    if (response?.status === 204) return data.id;
    return `${response?.status}: ${response?.statusText}`;
});



const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                const loadedCars = action.payload.map((car) => {
                    car.createdAt= car.createdAt.slice(0,19).replace('T',' ');
                    car.updatedAt= car.updatedAt.slice(0,19).replace('T',' ');
                    return car;
                });
                state.status = "succeeded";
                carsAdapter.upsertMany(state, loadedCars);
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewCar.fulfilled, (state, action) => {
                carsAdapter.addOne(state, action.payload);
                state.status = "succeeded";                
            })
            .addCase(updateCar.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateCar.fulfilled, (state, action) => {
                carsAdapter.upsertOne(state, action.payload);
                state.status = "succeeded";               
            })
            .addCase(deleteCar.fulfilled, (state, action) => {
                carsAdapter.removeOne(state, action.payload);
                state.status = 'loading';
            });
    },
});

export const {
    selectAll: selectAllCars,
    selectById: selectCarById,
    selectIds: selectCarsIds,
} = carsAdapter.getSelectors((state) => state.cars);

export const getCarsStatus = (state) => state.cars.status;
export const getCarsError = (state) => state.cars.error;


export default carsSlice.reducer;
