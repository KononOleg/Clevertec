import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IError, SignInPayloadAction } from '../../types';
import { recoveryPassword, resetPassword, signIn, signUp } from '../thunks/auth-thunks';

interface AuthSliceState {
  isPending: boolean;
  isAuth: boolean;
  error: IError | null;
  isSuccessfulRegistration: boolean;
  isSuccessfulResetPassword: boolean;
  isSuccessfulRecoveryPassword: boolean;
}

const initialState: AuthSliceState = {
  isPending: true,
  isAuth: false,
  error: null,
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
        password: '',
      };
    },

    checkisAuth(state) {
      const token = sessionStorage.getItem('token');

      if (token)
        return {
          ...state,
          isAuth: true,
          isPending: false,
        };

      return {
        ...state,
        isPending: false,
        isAuth: false,
      };
    },

    resetSlice(state) {
      return {
        ...state,
        isPending: false,
        password: '',
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

    builder.addCase(signIn.fulfilled.type, (state, action: PayloadAction<SignInPayloadAction>) => ({
      ...state,
      isPending: false,
      isAuth: true,
      password: action.payload.password,
    }));

    builder.addCase(signUp.fulfilled.type, (state) => ({
      ...state,
      isPending: false,
      isSuccessfulRegistration: true,
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

export const { resetSlice, signOut, checkisAuth } = authSlice.actions;
