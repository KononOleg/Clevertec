import { createAsyncThunk } from '@reduxjs/toolkit';

import { LibraryService } from '../../service/library-service';
import { IError, ILibrary } from '../../types';

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
  } catch {
    return thunkAPI.rejectWithValue({ message: ERROR_MESSAGE } as IError);
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
