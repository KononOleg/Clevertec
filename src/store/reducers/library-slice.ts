import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBook, IError, ILibrary } from '../../types';
import { getBook, getLibrary } from '../thunks/library-thunks';

interface LibrarySliceState {
  isPending: boolean;
  error: IError | null;
  library: ILibrary[];
  book: IBook | null;
  isDescendingOrder: boolean;
  filterText: string;
}

const initialState: LibrarySliceState = {
  isPending: true,
  error: null,
  library: [],
  book: null,
  isDescendingOrder: true,
  filterText: '',
};

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    resetError(state) {
      return { ...state, error: null };
    },

    switchOrder(state) {
      return { ...state, isDescendingOrder: !state.isDescendingOrder };
    },

    setFilterText(state, action) {
      return { ...state, filterText: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLibrary.pending, (state) => ({ ...state, isPending: true }));

    builder.addCase(getBook.pending, (state) => ({ ...state, isPending: true }));

    builder.addCase(getLibrary.fulfilled.type, (state, action: PayloadAction<ILibrary[]>) => ({
      ...state,
      isPending: false,
      library: action.payload,
    }));

    builder.addCase(getBook.fulfilled.type, (state, action: PayloadAction<IBook>) => ({
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

export const { resetError, switchOrder, setFilterText } = librarySlice.actions;
