import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userData: null,
  userMail: '',
  token: '',

};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsloggedIn: (state, payload: PayloadAction<boolean>) => {
      state.isLoggedIn = payload.payload;
    },
    setUserProfileData: (state, payload: PayloadAction<any>) => {
      state.userData = payload.payload;
    },
    setToken: (state, payload: PayloadAction<string>) => {
      state.token = payload.payload!;
    },
    setUserMail: (state, payload: PayloadAction<string>) => {
      state.userMail = payload.payload!;
    },


   
    setResetUser: state => {
      state.isLoggedIn = false;
      state.userData = null;
      state.userMail = '';
      state.token = '';


    },
  },
});

export const {
  setIsloggedIn,
  setUserProfileData,
  setToken,setUserMail,
  setResetUser,

} = authSlice.actions;

export default authSlice.reducer;
