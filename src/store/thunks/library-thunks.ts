import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { LibraryService } from '../../service/library-service';
import { AxiosErrorDataType } from '../../types';

export const getBooks = createAsyncThunk('library/getBooks', async (_, thunkAPI) => {
  try {
    const response = await LibraryService.getBooks();

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;

      return thunkAPI.rejectWithValue(data.error);
    }
  }

  return null;
});

export const getBook = createAsyncThunk('library/getBook', async (payload: { bookId: string }, thunkAPI) => {
  try {
    const response = await LibraryService.getBook(payload.bookId);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;

      return thunkAPI.rejectWithValue(data.error);
    }
  }

  return null;
});

export const getCategories = createAsyncThunk('library/getCategories', async (_, thunkAPI) => {
  try {
    const response = await LibraryService.getCategories();

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;

      return thunkAPI.rejectWithValue(data.error);
    }
  }

  return null;
});
