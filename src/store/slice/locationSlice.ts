import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserLocation = {
  lat: number;
  long: number;
  timestamp?: number; 
} | null;

interface LocationState {
  userLocation: UserLocation;
}

const initialState: LocationState = {
  userLocation: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setUserLocation: (state, action: PayloadAction<UserLocation>) => {
      state.userLocation = action.payload;
    },
    clearUserLocation: (state) => {
      state.userLocation = null;
    },
  },
});

export const { setUserLocation, clearUserLocation } = locationSlice.actions;

export default locationSlice.reducer;
