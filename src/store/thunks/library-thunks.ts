import { createAsyncThunk } from '@reduxjs/toolkit';

import { createLibrary } from '../../helpers';
import { LibraryService } from '../../service/library-service';
import { BookingBookRequest, CreateCommentRequest, IError } from '../../types';
import { RootState } from '../store';

const ERROR_MESSAGE = 'Что-то пошло не так. Обновите страницу через некоторое время.';

export const getLibrary = createAsyncThunk('library/getLibrary', async (_, thunkAPI) => {
  try {
    const [books, categories] = await Promise.all([LibraryService.getBooks(), LibraryService.getCategories()]);

    const library = createLibrary(categories.data, books.data);

    return library;
  } catch {
    return thunkAPI.rejectWithValue({ message: ERROR_MESSAGE } as IError);
  }
});

export const getBooks = createAsyncThunk('library/getBooks', async (_, { getState, rejectWithValue }) => {
  try {
    const books = await LibraryService.getBooks();

    const { librarySlice } = getState() as RootState;

    const library = createLibrary(librarySlice.library, books.data);

    return library;
  } catch {
    return rejectWithValue({ message: ERROR_MESSAGE } as IError);
  }
});

export const getBook = createAsyncThunk(
  'library/getBook',

  async (payload: { bookId: string }, thunkAPI) => {
    try {
      const response = await LibraryService.getBook(payload.bookId);

      return response.data;
    } catch {
      return thunkAPI.rejectWithValue({ message: ERROR_MESSAGE } as IError);
    }
  }
);

export const createComment = createAsyncThunk(
  'library/createComment',

  async (payload: CreateCommentRequest, thunkAPI) => {
    try {
      await LibraryService.createComment(payload);

      return { message: 'Спасибо, что нашли время оценить книгу!' };
    } catch {
      return thunkAPI.rejectWithValue({ message: 'Оценка не была отправлена. Попробуйте позже' } as IError);
    }
  }
);

export const bookingBook = createAsyncThunk(
  'library/bookingBook',

  async (payload: BookingBookRequest, thunkAPI) => {
    try {
      await LibraryService.bokingBook(payload);

      return { message: 'Книга забронирована. Подробности можно посмотреть на странице Профиль' };
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
      await LibraryService.rebokingBook(payload.bookingBookRequest, payload.bookingId);

      return { message: 'Изменения успешно сохранены!' };
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
      await LibraryService.deleteBooking(bookingId);

      return { message: 'Бронирование книги успешно отменено!' };
    } catch {
      return thunkAPI.rejectWithValue({
        message: 'Не удалось снять бронирование книги. Попробуйте позже!',
      } as IError);
    }
  }
);
