import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { LibraryService } from '../../service/library-service';
import { AxiosErrorDataType, BookingBookRequest, CreateCommentRequest, IError, ILibrary } from '../../types';

const ERROR_MESSAGE = 'Что-то пошло не так. Обновите страницу через некоторое время.';

export const getLibrary = createAsyncThunk('library/getLibrary', async (_, thunkAPI) => {
  try {
    const [books, categories] = await Promise.all([LibraryService.getBooks(), LibraryService.getCategories()]);

    const library: ILibrary[] = categories.data.map((category) => ({ ...category, books: [] }));

    books.data.forEach((book) => {
      book.categories.forEach((category) => {
        const categoryIndex = library.findIndex((currentCategory) => currentCategory.name === category);

        library[categoryIndex].books.push(book);
      });
    });

    return library;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;

      return thunkAPI.rejectWithValue(data.error);
    }

    return thunkAPI.rejectWithValue({ message: ERROR_MESSAGE } as IError);
  }
});

export const getBook = createAsyncThunk(
  'library/getBook',

  async (payload: { bookId: string }, thunkAPI) => {
    try {
      const response = await LibraryService.getBook(payload.bookId);

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

export const createComment = createAsyncThunk(
  'library/createComment',

  async (payload: CreateCommentRequest, thunkAPI) => {
    try {
      const response = await LibraryService.createComment(payload);

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;

        return thunkAPI.rejectWithValue(data.error);
      }

      return thunkAPI.rejectWithValue({ message: 'Оценка не была отправлена. Попробуйте позже' } as IError);
    }
  }
);

export const bookingBook = createAsyncThunk(
  'library/bookingBook',

  async (payload: BookingBookRequest, thunkAPI) => {
    try {
      const response = await LibraryService.bokingBook(payload);

      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const data = err.response.data as AxiosErrorDataType;

        return thunkAPI.rejectWithValue(data.error);
      }

      return thunkAPI.rejectWithValue({
        message: 'Что-то пошло не так, книга не забронирована. Попробуйте позже!',
      } as IError);
    }
  }
);
