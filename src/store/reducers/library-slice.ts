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
      return { ...state, error: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLibrary.pending, (state) => ({ ...state, isPending: true }));

    builder.addCase(getBook.pending, (state) => ({ ...state, isPending: true }));

    builder.addCase(getLibrary.fulfilled, (state, action: PayloadAction<any>) => ({
      ...state,
      isPending: false,
      library: action.payload,
    }));

    builder.addCase(getBook.fulfilled.type, (state, action: PayloadAction<any>) => ({
      ...state,
      isPending: false,
      book: action.payload,
    }));

    builder.addCase(getLibrary.rejected.type, (state, action: PayloadAction<IError>) => ({
      ...state,
      isPending: false,
      book: null,
      library: [],
      error: action.payload,
    }));

    builder.addCase(getBook.rejected.type, (state, action: PayloadAction<IError>) => ({
      ...state,
      isPending: false,
      book: null,
      library: [],
      error: action.payload,
    }));
  },
});

export const { resetError } = librarySlice.actions;
