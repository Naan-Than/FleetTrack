import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Driver {
    id: number;
    lat: number;
    long: number;
    destLat: number;
    destLong: number;
    status: string;
}

interface DriverState {
    lastKnownDrivers: Driver[];
}

const initialState: DriverState = {
    lastKnownDrivers: [],
};

export const driverSlice = createSlice({
    name: "drivers",
    initialState,
    reducers: {
        setLastKnownDrivers: (state, action: PayloadAction<Driver[]>) => {
            state.lastKnownDrivers = action.payload;
        },
    },
});

export const { setLastKnownDrivers } = driverSlice.actions;

export default driverSlice.reducer;
