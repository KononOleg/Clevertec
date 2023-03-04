import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { AuthService } from '../../service/auth-service';
import { AxiosErrorDataType, IError, SignUpRequest } from '../../types';

const ERROR_MESSAGE = 'Что-то пошло не так. Обновите страницу через некоторое время.';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload: { login: string; password: string }, thunkAPI) => {
    try {
      const response = await AuthService.signIn(payload.login, payload.password);

      const { jwt, user } = response.data;

      localStorage.setItem('token', jwt);

      return user;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;

        return thunkAPI.rejectWithValue(data.error);
      }

      return thunkAPI.rejectWithValue({ message: ERROR_MESSAGE } as IError);
    }
  }
);

export const signUp = createAsyncThunk('auth/signUp', async (payload: SignUpRequest, thunkAPI) => {
  try {
    const response = await AuthService.signUp(payload);

    return response.data.user;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;

      return thunkAPI.rejectWithValue(data.error);
    }

    return thunkAPI.rejectWithValue({ message: ERROR_MESSAGE } as IError);
  }
});
