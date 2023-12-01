import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  age: '',
  email: '',
  password: '',
  gender: '',
  termsAndConditions: false,
  image: null,
};

const formSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    setName: (state, { payload }) => {
      state.name = payload;
    },
    setAge: (state, { payload }) => {
      state.age = payload;
    },
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    setPassword: (state, { payload }) => {
      state.password = payload;
    },
    setGender: (state, { payload }) => {
      state.gender = payload;
    },
    setImage: (state, { payload }) => {
      state.image = payload;
    },
    setTermsAndConditions: (state, { payload }) => {
      state.image = payload;
    },
  },
});

export const {
  setName,
  setAge,
  setEmail,
  setPassword,
  setGender,
  setImage,
  setTermsAndConditions,
} = formSlice.actions;
export default formSlice.reducer;
