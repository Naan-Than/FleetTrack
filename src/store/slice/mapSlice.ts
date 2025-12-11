import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: MapState = {
  pickupLocation: null,
  dropLocation: null,

};
export const mapSlice = createSlice({
  name: 'map',
  initialState: initialState,
  reducers: {
    setPickupLocation: (state, payload: PayloadAction<LocationType>) => {
      state.pickupLocation = payload.payload;
    },
    setDropLocation: (state, payload: PayloadAction<LocationType>) => {
      console.log(payload.payload);
      state.dropLocation = payload.payload;
      console.log(state.dropLocation);
    },

    setResetLocations: state => {
      // console.log("Resetting locations in map slice");
      state.pickupLocation = null;
      state.dropLocation = null;
    },

  },
});

export const {
  setDropLocation,
  setPickupLocation,
  setResetLocations,

} = mapSlice.actions;

export default mapSlice.reducer;


export interface LocationType {
  name: string;
  lat: number;
  long: number;
  placeId: string;
}
export interface MapState {
  pickupLocation: LocationType | null;
  dropLocation: LocationType | null;
}
