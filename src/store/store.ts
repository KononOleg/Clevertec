import { configureStore } from '@reduxjs/toolkit';

import { appSlice } from './reducers/app-slice';
import { authSlice } from './reducers/auth-slice';
import { librarySlice } from './reducers/library-slice';

export const store = configureStore({
  reducer: { librarySlice: librarySlice.reducer, appSlice: appSlice.reducer, authSlice: authSlice.reducer },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
