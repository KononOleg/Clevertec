import { createAsyncThunk } from '@reduxjs/toolkit';

import { ERROR_MESSAGE } from '../../constants';
import { AccountService } from '../../service/acсount-service';
import { Error, UpdateAccountResponse } from '../../types';

export const getAccount = createAsyncThunk('account/getAccount', async (_, { rejectWithValue }) => {
  try {
    const response = await AccountService.getAccount();

    return response.data;
  } catch {
    return rejectWithValue({ message: ERROR_MESSAGE } as Error);
  }
});

export const updateAccount = createAsyncThunk(
  'account/updateAccount',
  async (payload: { userId: string; user: UpdateAccountResponse }, { rejectWithValue }) => {
    try {
      const response = await AccountService.updateAccount(payload.userId, payload.user);
      const success = { message: 'Изменения успешно сохранены!' };

      return { success, account: response.data };
    } catch {
      return rejectWithValue({ message: 'Изменения не были сохранены. Попробуйте позже!' } as Error);
    }
  }
);

export const uploadFile = createAsyncThunk(
  'account/uploadFile',
  async (payload: { files: FormData; userId: string }, { rejectWithValue }) => {
    try {
      const { data } = await AccountService.uploadFile(payload.files);
      const response = await AccountService.updateAvatar(payload.userId, data[0].id);
      const success = { message: 'Фото успешно сохранено!' };

      return { success, account: response.data };
    } catch {
      return rejectWithValue({
        message: 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!',
      } as Error);
    }
  }
);
