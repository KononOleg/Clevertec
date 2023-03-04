import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IError, IUser } from '../../types';
import { signIn, signUp } from '../thunks/auth-thunks';

interface AuthSliceState {
  isPending: boolean;
  isAuth: boolean;
  error: IError | null;
  user: IUser | null;
  isSuccessfulRegistration: boolean;
}

const initialState: AuthSliceState = {
  isPending: false,
  isAuth: false,
  error: null,
  user: null,
  isSuccessfulRegistration: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetSlice(state) {
      return { ...state, isPending: false, isAuth: false, error: null, user: null, isSuccessfulRegistration: false };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => ({ ...state, isPending: true }));
    builder.addCase(signUp.pending, (state) => ({ ...state, isPending: true }));

    builder.addCase(signIn.fulfilled.type, (state, action: PayloadAction<IUser>) => ({
      ...state,
      isPending: false,
      isAuth: true,
      user: action.payload,
    }));

    builder.addCase(signUp.fulfilled.type, (state, action: PayloadAction<IUser>) => ({
      ...state,
      isPending: false,
      isSuccessfulRegistration: true,
      user: action.payload,
    }));

    builder.addCase(signIn.rejected.type, (state, action: PayloadAction<IError>) => ({
      ...state,
      isPending: false,
      error: action.payload,
    }));

    builder.addCase(signUp.rejected.type, (state, action: PayloadAction<IError>) => ({
      ...state,
      isPending: false,
      error: action.payload,
    }));
  },
});

export const { resetSlice } = authSlice.actions;
