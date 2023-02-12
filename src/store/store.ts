import { configureStore } from '@reduxjs/toolkit';

import { librarySlice } from './reducers/library-slice';

export const store = configureStore({
  reducer: { librarySlice: librarySlice.reducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
