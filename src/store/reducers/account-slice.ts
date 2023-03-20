import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAccount, IError } from '../../types';
import { getAccount, updateAccount } from '../thunks/account-thunks';

interface AccountSliceState {
  account: IAccount | null;
  isPending: boolean;
  error: IError | null;
}

const initialState: AccountSliceState = {
  account: null,
  isPending: false,

  error: null,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAccount.pending, (state) => ({ ...state, isPending: true }));

    builder.addCase(updateAccount.pending, (state) => ({ ...state, isPending: true }));

    builder.addCase(getAccount.fulfilled.type, (state, action: PayloadAction<IAccount>) => ({
      ...state,
      isPending: false,
      account: action.payload,
    }));

    builder.addCase(updateAccount.fulfilled.type, (state, action: PayloadAction<IAccount>) => ({
      ...state,
      isPending: false,
      account: action.payload,
    }));

    builder.addCase(getAccount.rejected.type, (state, action: PayloadAction<IError>) => ({
      ...state,
      isPending: false,
      error: action.payload,
    }));

    builder.addCase(updateAccount.rejected.type, (state, action: PayloadAction<IError>) => ({
      ...state,
      isPending: false,
      error: action.payload,
    }));
  },
});
