import { createSlice } from '@reduxjs/toolkit';

interface LibrarySliceState {
  isPending: boolean;
}

const initialState: LibrarySliceState = {
  isPending: false,
};

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {},
  extraReducers: () => {},
});
