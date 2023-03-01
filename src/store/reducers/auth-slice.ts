import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IError, IUser } from '../../types';
import { signIn } from '../thunks/auth-thunks';
import { getLibrary } from '../thunks/library-thunks';

interface AuthSliceState {
  isPending: boolean;
  isAuth: boolean;
  error: IError | null;
  user: IUser | null;
}

const initialState: AuthSliceState = {
  isPending: false,
  isAuth: false,
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => ({ ...state, isPending: true }));

    builder.addCase(signIn.fulfilled.type, (state, action: PayloadAction<IUser>) => ({
      ...state,
      isPending: false,
      isAuth: true,
      user: action.payload,
    }));

    builder.addCase(getLibrary.rejected.type, (state, action: PayloadAction<IError>) => ({
      ...state,
      isPending: false,
      error: action.payload,
    }));
  },
});
