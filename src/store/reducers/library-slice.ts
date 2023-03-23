import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookingModalParams, IBook, IError, ILibrary, ISuccess, ReviewModalParams } from '../../types';
import {
  bookingBook,
  createComment,
  deleteBooking,
  getBook,
  getBooks,
  getLibrary,
  rebookingBook,
} from '../thunks/library-thunks';

interface LibrarySliceState {
  isPending: boolean;
  error: IError | null;
  success: ISuccess | null;
  library: ILibrary[];
  book: IBook | null;
  isDescendingOrder: boolean;
  filterText: string;
  bookingModalParams: BookingModalParams | null;
  reviewModalParams: ReviewModalParams | null;
}

const initialState: LibrarySliceState = {
  isPending: true,
  error: null,
  success: null,
  library: [],
  book: null,
  isDescendingOrder: true,
  filterText: '',
  bookingModalParams: null,
  reviewModalParams: null,
};

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    resetErrorLibrary(state) {
      return { ...state, error: null };
    },

    resetSuccessLibrary(state) {
      return { ...state, success: null };
    },

    switchOrder(state) {
      return { ...state, isDescendingOrder: !state.isDescendingOrder };
    },

    setFilterText(state, action) {
      return { ...state, filterText: action.payload };
    },

    setReviewModalParams(state, action) {
      return { ...state, reviewModalParams: action.payload };
    },

    setBookingModalParams(state, action) {
      return { ...state, bookingModalParams: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLibrary.pending, (state) => ({ ...state, isPending: true }));

    builder.addCase(getBook.pending, (state) => ({ ...state, isPending: true }));

    builder.addCase(getBooks.pending, (state) => ({ ...state, isPending: true }));

    builder.addCase(createComment.pending, (state) => ({ ...state, isPending: true }));

    builder.addCase(bookingBook.pending, (state) => ({ ...state, isPending: true }));

    builder.addCase(deleteBooking.pending, (state) => ({ ...state, isPending: true }));

    builder.addCase(rebookingBook.pending, (state) => ({ ...state, isPending: true }));

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

    builder.addCase(getBooks.fulfilled.type, (state, action: PayloadAction<ILibrary[]>) => ({
      ...state,
      isPending: false,
      library: action.payload,
    }));

    builder.addCase(createComment.fulfilled.type, (state, action: PayloadAction<ISuccess>) => ({
      ...state,
      isPending: false,
      reviewModalParams: null,
      success: action.payload,
    }));

    builder.addCase(bookingBook.fulfilled.type, (state, action: PayloadAction<ISuccess>) => ({
      ...state,
      isPending: false,
      bookingModalParams: null,
      success: action.payload,
    }));

    builder.addCase(deleteBooking.fulfilled.type, (state, action: PayloadAction<ISuccess>) => ({
      ...state,
      isPending: false,
      bookingModalParams: null,
      success: action.payload,
    }));

    builder.addCase(rebookingBook.fulfilled.type, (state, action: PayloadAction<ISuccess>) => ({
      ...state,
      isPending: false,
      bookingModalParams: null,
      success: action.payload,
    }));

    builder.addCase(getLibrary.rejected.type, (state, action: PayloadAction<IError>) => ({
      ...state,
      isPending: false,
      book: null,
      library: [],
      error: action.payload,
    }));

    builder.addCase(getBooks.rejected.type, (state, action: PayloadAction<IError>) => ({
      ...state,
      isPending: false,
      book: null,
      error: action.payload,
    }));

    builder.addCase(getBook.rejected.type, (state, action: PayloadAction<IError>) => ({
      ...state,
      isPending: false,
      book: null,
      library: [],
      error: action.payload,
    }));

    builder.addCase(createComment.rejected.type, (state, action: PayloadAction<IError>) => ({
      ...state,
      isPending: false,
      reviewModalParams: null,
      error: action.payload,
    }));

    builder.addCase(bookingBook.rejected.type, (state, action: PayloadAction<IError>) => ({
      ...state,
      isPending: false,
      bookingModalParams: null,
      error: action.payload,
    }));

    builder.addCase(deleteBooking.rejected.type, (state, action: PayloadAction<IError>) => ({
      ...state,
      isPending: false,
      bookingModalParams: null,
      error: action.payload,
    }));

    builder.addCase(rebookingBook.rejected.type, (state, action: PayloadAction<IError>) => ({
      ...state,
      isPending: false,
      bookingModalParams: null,
      error: action.payload,
    }));
  },
});

export const {
  resetErrorLibrary,
  switchOrder,
  setFilterText,
  setReviewModalParams,
  resetSuccessLibrary,
  setBookingModalParams,
} = librarySlice.actions;
