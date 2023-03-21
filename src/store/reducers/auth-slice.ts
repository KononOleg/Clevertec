import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IError, IUser } from '../../types';
import { recoveryPassword, resetPassword, signIn, signUp } from '../thunks/auth-thunks';

interface AuthSliceState {
  isPending: boolean;
  isAuth: boolean;
  error: IError | null;
  user: IUser | null;
  isSuccessfulRegistration: boolean;
  isSuccessfulResetPassword: boolean;
  isSuccessfulRecoveryPassword: boolean;
}

const initialState: AuthSliceState = {
  isPending: false,
  isAuth: false,
  error: null,
  user: null,
  isSuccessfulRegistration: false,
  isSuccessfulResetPassword: false,
  isSuccessfulRecoveryPassword: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut(state) {
      sessionStorage.removeItem('token');

      return {
        ...state,
        isAuth: false,
      };
    },

    resetSlice(state) {
      return {
        ...state,
        isPending: false,
        error: null,
        user: null,
        isSuccessfulRegistration: false,
        isSuccessfulResetPassword: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => ({ ...state, isPending: true }));
    builder.addCase(signUp.pending, (state) => ({ ...state, isPending: true }));
    builder.addCase(resetPassword.pending, (state) => ({ ...state, isPending: true }));
    builder.addCase(recoveryPassword.pending, (state) => ({ ...state, isPending: true }));

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

    builder.addCase(resetPassword.fulfilled.type, (state) => ({
      ...state,
      isPending: false,
      isSuccessfulResetPassword: true,
    }));

    builder.addCase(recoveryPassword.fulfilled.type, (state) => ({
      ...state,
      isPending: false,
      isSuccessfulRecoveryPassword: true,
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

    builder.addCase(resetPassword.rejected.type, (state, action: PayloadAction<IError>) => ({
      ...state,
      isPending: false,
      error: action.payload,
    }));

    builder.addCase(recoveryPassword.rejected.type, (state, action: PayloadAction<IError>) => ({
      ...state,
      isPending: false,
      error: action.payload,
    }));
  },
});

export const { resetSlice, signOut } = authSlice.actions;
