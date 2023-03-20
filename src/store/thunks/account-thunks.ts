import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { AccountService } from '../../service/acсount-service';
import { AxiosErrorDataType, IError, IUser } from '../../types';

const ERROR_MESSAGE = 'Что-то пошло не так. Обновите страницу через некоторое время.';

export const getAccount = createAsyncThunk('account/getAccount', async (userId: string, thunkAPI) => {
  try {
    const response = await AccountService.getAccount(userId);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;

      return thunkAPI.rejectWithValue(data.error);
    }

    return thunkAPI.rejectWithValue({ message: ERROR_MESSAGE } as IError);
  }
});

export const updateAccount = createAsyncThunk(
  'account/updateAccount',
  async (payload: { userId: string; user: IUser }, thunkAPI) => {
    try {
      const response = await AccountService.updateAccount(payload.userId, payload.user);

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;

        return thunkAPI.rejectWithValue(data.error);
      }

      return thunkAPI.rejectWithValue({ message: ERROR_MESSAGE } as IError);
    }
  }
);
