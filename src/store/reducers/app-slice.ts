import { createSlice } from '@reduxjs/toolkit';

interface AppSliceState {
  isBurgerActive: boolean;
}

const initialState: AppSliceState = {
  isBurgerActive: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsBurgerActive(state, action) {
      return { ...state, isBurgerActive: action.payload };
    },
  },
});

export const { setIsBurgerActive } = appSlice.actions;
