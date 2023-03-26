import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isPendingAction, isRejectedAction } from '../../helpers';
import { Error, SignInPayloadAction } from '../../types';
import { recoveryPassword, resetPassword, signIn, signUp } from '../thunks/auth-thunks';

type AuthSliceState = {
  isPending: boolean;
  isAuth: boolean;
  error: Error | null;
  isSuccessfulRegistration: boolean;
  isSuccessfulResetPassword: boolean;
  isSuccessfulRecoveryPassword: boolean;
};

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
        isPending: true,
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
    builder
      .addCase(signIn.fulfilled, (state, action: PayloadAction<SignInPayloadAction>) => ({
        ...state,
        isPending: false,
        isAuth: true,
        password: action.payload.password,
      }))

      .addCase(signUp.fulfilled, (state) => ({
        ...state,
        isPending: false,
        isSuccessfulRegistration: true,
      }))

      .addCase(resetPassword.fulfilled, (state) => ({
        ...state,
        isPending: false,
        isSuccessfulResetPassword: true,
      }));
    builder
      .addCase(recoveryPassword.fulfilled, (state) => ({
        ...state,
        isPending: false,
        isSuccessfulRecoveryPassword: true,
      }))
      .addMatcher(isPendingAction('auth'), (state) => ({ ...state, isPending: true }))

      .addMatcher(isRejectedAction('auth'), (state, action) => ({ ...state, isPending: false, error: action.payload }));
  },
});

export const { resetSlice, signOut, checkisAuth } = authSlice.actions;
