import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookingModalParams, IBook, IError, ILibrary, ISuccess } from '../../types';
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
  isReviewModalActive: boolean;
  bookingModalParams: BookingModalParams | null;
}

const initialState: LibrarySliceState = {
  isPending: true,
  error: null,
  success: null,
  library: [],
  book: null,
  isDescendingOrder: true,
  filterText: '',
  isReviewModalActive: false,
  bookingModalParams: null,
};

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    resetError(state) {
      return { ...state, error: null };
    },

    resetSuccess(state) {
      return { ...state, success: null };
    },

    switchOrder(state) {
      return { ...state, isDescendingOrder: !state.isDescendingOrder };
    },

    setFilterText(state, action) {
      return { ...state, filterText: action.payload };
    },

    setIsReviewModalActive(state, action) {
      return { ...state, isReviewModalActive: action.payload };
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
      isReviewModalActive: false,
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
      isReviewModalActive: false,
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

export const { resetError, switchOrder, setFilterText, setIsReviewModalActive, resetSuccess, setBookingModalParams } =
  librarySlice.actions;
