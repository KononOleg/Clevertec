import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBook, IError, ILibrary } from '../../types';
import { getBook, getLibrary } from '../thunks/library-thunks';

interface LibrarySliceState {
  isPending: boolean;
  error: IError | null;
  library: ILibrary[];
  book: IBook | null;
}

const initialState: LibrarySliceState = {
  isPending: true,
  error: null,
  library: [],
  book: null,
};

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    resetError(state) {
      // eslint-disable-next-line no-param-reassign
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLibrary.pending.type, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isPending = true;
    });

    builder.addCase(getBook.pending.type, (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isPending = true;
    });

    builder.addCase(getLibrary.fulfilled.type, (state, action: PayloadAction<ILibrary[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.isPending = false;
      // eslint-disable-next-line no-param-reassign
      state.library = action.payload;
    });

    builder.addCase(getBook.fulfilled.type, (state, action: PayloadAction<IBook>) => {
      // eslint-disable-next-line no-param-reassign
      state.isPending = false;
      // eslint-disable-next-line no-param-reassign
      state.book = action.payload;
    });

    builder.addCase(getLibrary.rejected.type, (state, action: PayloadAction<IError>) => {
      // eslint-disable-next-line no-param-reassign
      state.isPending = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    });

    builder.addCase(getBook.rejected.type, (state, action: PayloadAction<IError>) => {
      // eslint-disable-next-line no-param-reassign
      state.isPending = false;
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    });
  },
});

export const { resetError } = librarySlice.actions;
