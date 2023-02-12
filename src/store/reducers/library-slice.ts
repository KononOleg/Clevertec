import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBook, ICategory, IError } from '../../types';
import { getBook, getBooks, getCategories } from '../thunks/library-thunks';

interface LibrarySliceState {
  isPending: boolean;
  error: IError | null;
  books: IBook[];
  categories: ICategory[];
  book: IBook | null;
}

const initialState: LibrarySliceState = {
  isPending: false,
  error: null,
  books: [],
  categories: [],
  book: null,
};

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending.type, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isPending = true;
    });

    builder.addCase(getBook.pending.type, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isPending = true;
    });

    builder.addCase(getCategories.pending.type, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isPending = true;
    });

    builder.addCase(getBooks.fulfilled.type, (state, action: PayloadAction<IBook[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.isPending = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
      // eslint-disable-next-line no-param-reassign
      state.books = action.payload;
    });

    builder.addCase(getBook.fulfilled.type, (state, action: PayloadAction<IBook>) => {
      // eslint-disable-next-line no-param-reassign
      state.isPending = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
      // eslint-disable-next-line no-param-reassign
      state.book = action.payload;
    });

    builder.addCase(getCategories.fulfilled.type, (state, action: PayloadAction<ICategory[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.isPending = false;
      // eslint-disable-next-line no-param-reassign
      state.error = null;
      // eslint-disable-next-line no-param-reassign
      state.categories = action.payload;
    });
  },
});
