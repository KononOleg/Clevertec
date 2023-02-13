import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { LibraryService } from '../../service/library-service';
import { AxiosErrorDataType, ILibrary } from '../../types';

export const getLibrary = createAsyncThunk('library/getBooks', async (_, thunkAPI) => {
  try {
    const books = await LibraryService.getBooks();
    const categories = await LibraryService.getCategories();

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
