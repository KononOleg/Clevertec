import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isPendingAction, isRejectedAction } from '../../helpers';
import { Book, BookingModalParams, Error, Library, ReviewModalParams, Success } from '../../types';
import {
  bookingBook,
  createComment,
  deleteBooking,
  getBook,
  getBooks,
  getLibrary,
  rebookingBook,
  updateComment,
} from '../thunks/library-thunks';

type LibrarySliceState = {
  isPending: boolean;
  error: Error | null;
  success: Success | null;
  library: Library[];
  book: Book | null;
  isDescendingOrder: boolean;
  filterText: string;
  bookingModalParams: BookingModalParams | null;
  reviewModalParams: ReviewModalParams | null;
};

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
    builder
      .addCase(getLibrary.fulfilled, (state, action: PayloadAction<Library[]>) => ({
        ...state,
        library: action.payload,
        isPending: false,
      }))

      .addCase(getBook.fulfilled, (state, action: PayloadAction<Book>) => ({
        ...state,
        book: action.payload,
        isPending: false,
      }))

      .addCase(getBooks.fulfilled, (state, action: PayloadAction<Library[]>) => ({
        ...state,
        library: action.payload,
        isPending: false,
      }))

      .addCase(createComment.fulfilled, (state, action: PayloadAction<Success>) => ({
        ...state,
        reviewModalParams: null,
        success: action.payload,
        isPending: false,
      }))

      .addCase(updateComment.fulfilled, (state, action: PayloadAction<Success>) => ({
        ...state,
        reviewModalParams: null,
        success: action.payload,
        isPending: false,
      }))

      .addCase(bookingBook.fulfilled, (state, action: PayloadAction<Success>) => ({
        ...state,
        bookingModalParams: null,
        success: action.payload,
        isPending: false,
      }))

      .addCase(deleteBooking.fulfilled, (state, action: PayloadAction<Success>) => ({
        ...state,
        bookingModalParams: null,
        success: action.payload,
        isPending: false,
      }))

      .addCase(rebookingBook.fulfilled, (state, action: PayloadAction<Success>) => ({
        ...state,
        reviewModalParams: null,
        bookingModalParams: null,
        success: action.payload,
        isPending: false,
      }))

      .addMatcher(isPendingAction('library'), (state) => ({ ...state, isPending: true }))

      .addMatcher(isRejectedAction('library'), (state, action) => ({
        ...state,
        bookingModalParams: null,
        error: action.payload,
        reviewModalParams: null,
        isPending: false,
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
