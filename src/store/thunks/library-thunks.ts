import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { LibraryService } from '../../service/library-service';
import { AxiosErrorDataType, BookingBookRequest, CreateCommentRequest, IError, ILibrary } from '../../types';
import { RootState } from '../store';

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

export const getBooks = createAsyncThunk('library/getBooks', async (_, { getState, rejectWithValue }) => {
  try {
    const books = await LibraryService.getBooks();

    const { librarySlice } = getState() as RootState;

    const newLibrary: ILibrary[] = librarySlice.library.map((category) => ({ ...category, books: [] }));

    books.data.forEach((book) => {
      book.categories.forEach((category) => {
        const categoryIndex = newLibrary.findIndex((currentCategory) => currentCategory.name === category);

        newLibrary[categoryIndex].books.push(book);
      });
    });

    return newLibrary;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const data = err.response.data as AxiosErrorDataType;

      return rejectWithValue(data.error);
    }

    return rejectWithValue({ message: ERROR_MESSAGE } as IError);
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
    } catch {
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
    } catch {
      return thunkAPI.rejectWithValue({
        message: 'Что-то пошло не так, книга не забронирована. Попробуйте позже!',
      } as IError);
    }
  }
);

export const rebookingBook = createAsyncThunk(
  'library/rebookingBook',

  async (payload: { bookingBookRequest: BookingBookRequest; bookingId: string }, thunkAPI) => {
    try {
      const response = await LibraryService.rebokingBook(payload.bookingBookRequest, payload.bookingId);

      return response.data;
    } catch {
      return thunkAPI.rejectWithValue({
        message: 'Изменения не были сохранены. Попробуйте позже!',
      } as IError);
    }
  }
);

export const deleteBooking = createAsyncThunk(
  'library/deleteBooking',

  async (bookingId: string, thunkAPI) => {
    try {
      const response = await LibraryService.deleteBooking(bookingId);

      return response.data;
    } catch {
      return thunkAPI.rejectWithValue({
        message: 'Не удалось снять бронирование книги. Попробуйте позже!',
      } as IError);
    }
  }
);
