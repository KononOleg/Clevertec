import { createAsyncThunk } from '@reduxjs/toolkit';

import { AccountService } from '../../service/acсount-service';
import { IError, UpdateAccountResponse } from '../../types';

const ERROR_MESSAGE = 'Что-то пошло не так. Обновите страницу через некоторое время.';

export const getAccount = createAsyncThunk('account/getAccount', async (_, thunkAPI) => {
  try {
    const response = await AccountService.getAccount();

    return response.data;
  } catch {
    return thunkAPI.rejectWithValue({ message: ERROR_MESSAGE } as IError);
  }
});

export const updateAccount = createAsyncThunk(
  'account/updateAccount',
  async (payload: { userId: string; user: UpdateAccountResponse }, thunkAPI) => {
    try {
      const response = await AccountService.updateAccount(payload.userId, payload.user);
      const success = { message: 'Изменения успешно сохранены!' };

      return { success, account: response.data };
    } catch {
      return thunkAPI.rejectWithValue({ message: 'Изменения не были сохранены. Попробуйте позже!' } as IError);
    }
  }
);
