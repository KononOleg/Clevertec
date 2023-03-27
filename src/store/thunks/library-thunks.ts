import { createAsyncThunk } from '@reduxjs/toolkit';

import { ERROR_MESSAGE } from '../../constants';
import { createLibrary } from '../../helpers';
import { LibraryService } from '../../service/library-service';
import { BookingBookRequest, CreateCommentRequest, Error } from '../../types';
import { RootState } from '../store';

export const getLibrary = createAsyncThunk('library/getLibrary', async (_, { rejectWithValue }) => {
  try {
    const [books, categories] = await Promise.all([LibraryService.getBooks(), LibraryService.getCategories()]);
    const library = createLibrary(categories.data, books.data);

    return library;
  } catch {
    return rejectWithValue({ message: ERROR_MESSAGE } as Error);
  }
});

export const getBooks = createAsyncThunk('library/getBooks', async (_, { getState, rejectWithValue }) => {
  try {
    const books = await LibraryService.getBooks();

    const { librarySlice } = getState() as RootState;

    const library = createLibrary(librarySlice.library, books.data);

    return library;
  } catch {
    return rejectWithValue({ message: ERROR_MESSAGE } as Error);
  }
});

export const getBook = createAsyncThunk(
  'library/getBook',

  async (payload: { bookId: string }, { rejectWithValue }) => {
    try {
      const response = await LibraryService.getBook(payload.bookId);

      return response.data;
    } catch {
      return rejectWithValue({ message: ERROR_MESSAGE } as Error);
    }
  }
);

export const createComment = createAsyncThunk(
  'library/createComment',

  async (payload: CreateCommentRequest, { rejectWithValue }) => {
    try {
      await LibraryService.createComment(payload);

      return { message: 'Спасибо, что нашли время оценить книгу!' };
    } catch {
      return rejectWithValue({ message: 'Оценка не была отправлена. Попробуйте позже!' } as Error);
    }
  }
);

export const updateComment = createAsyncThunk(
  'library/updateComment',

  async (payload: { data: CreateCommentRequest; commentId: string }, { rejectWithValue }) => {
    try {
      await LibraryService.updateComment(payload.data, payload.commentId);

      return { message: 'Спасибо, что нашли время изменить оценку!' };
    } catch {
      return rejectWithValue({ message: 'Изменения не были сохранены. Попробуйте позже!' } as Error);
    }
  }
);

export const bookingBook = createAsyncThunk(
  'library/bookingBook',

  async (payload: BookingBookRequest, { rejectWithValue }) => {
    try {
      await LibraryService.bokingBook(payload);

      return { message: 'Книга забронирована. Подробности можно посмотреть на странице Профиль' };
    } catch {
      return rejectWithValue({
        message: 'Что-то пошло не так, книга не забронирована. Попробуйте позже!',
      } as Error);
    }
  }
);

export const rebookingBook = createAsyncThunk(
  'library/rebookingBook',

  async (payload: { bookingBookRequest: BookingBookRequest; bookingId: string }, { rejectWithValue }) => {
    try {
      await LibraryService.rebokingBook(payload.bookingBookRequest, payload.bookingId);

      return { message: 'Изменения успешно сохранены!' };
    } catch {
      return rejectWithValue({
        message: 'Изменения не были сохранены. Попробуйте позже!',
      } as Error);
    }
  }
);

export const deleteBooking = createAsyncThunk(
  'library/deleteBooking',

  async (bookingId: string, { rejectWithValue }) => {
    try {
      await LibraryService.deleteBooking(bookingId);

      return { message: 'Бронирование книги успешно отменено!' };
    } catch {
      return rejectWithValue({
        message: 'Не удалось снять бронирование книги. Попробуйте позже!',
      } as Error);
    }
  }
);
