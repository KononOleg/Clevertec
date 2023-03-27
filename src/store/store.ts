import { configureStore } from '@reduxjs/toolkit';

import { accountSlice } from './reducers/account-slice';
import { appSlice } from './reducers/app-slice';
import { authSlice } from './reducers/auth-slice';
import { librarySlice } from './reducers/library-slice';

export const store = configureStore({
  reducer: {
    appSlice: appSlice.reducer,
    authSlice: authSlice.reducer,
    librarySlice: librarySlice.reducer,
    accountSlice: accountSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
