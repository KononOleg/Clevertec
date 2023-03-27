import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { ERROR_MESSAGE } from '../../constants';
import { AuthService } from '../../service/auth-service';
import { AxiosErrorDataType, Error, SignUpRequest } from '../../types';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload: { login: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await AuthService.signIn(payload.login, payload.password);
      const { jwt, user } = response.data;

      sessionStorage.setItem('token', jwt);
      sessionStorage.setItem('password', payload.password);

      return { user, password: payload.password };
    } catch (err) {
      const { response } = (await err) as AxiosError;

      return rejectWithValue({ status: response?.status } as Error);
    }
  }
);

export const signUp = createAsyncThunk('auth/signUp', async (payload: SignUpRequest, { rejectWithValue }) => {
  try {
    const response = await AuthService.signUp(payload);

    return response.data.user;
  } catch (err) {
    const { response } = (await err) as AxiosError;

    return rejectWithValue({ status: response?.status } as Error);
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (email: string, { rejectWithValue }) => {
  try {
    const response = await AuthService.resetPassword(email);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;

      return rejectWithValue(data.error);
    }

    return rejectWithValue({ message: ERROR_MESSAGE } as Error);
  }
});

export const recoveryPassword = createAsyncThunk(
  'auth/recoveryPassword',
  async (payload: { password: string; passwordConfirmation: string; code: string }, { rejectWithValue }) => {
    try {
      const { password, passwordConfirmation, code } = payload;
      const response = await AuthService.recoveryPassword(password, passwordConfirmation, code);

      return response.data;
    } catch {
      return rejectWithValue({ message: ERROR_MESSAGE } as Error);
    }
  }
);
