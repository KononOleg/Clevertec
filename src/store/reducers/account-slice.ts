import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AccountPayloadAction, IAccount, IError, ISuccess } from '../../types';
import { getAccount, updateAccount } from '../thunks/account-thunks';

interface AccountSliceState {
  account: IAccount | null;
  isPending: boolean;
  success: ISuccess | null;
  error: IError | null;
}

const initialState: AccountSliceState = {
  account: null,
  isPending: false,
  success: null,
  error: null,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    resetErrorAccount(state) {
      return { ...state, error: null };
    },

    resetSuccessAccount(state) {
      return { ...state, success: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAccount.pending, (state) => ({ ...state, isPending: true }));

    builder.addCase(updateAccount.pending, (state) => ({ ...state, isPending: true }));

    builder.addCase(getAccount.fulfilled.type, (state, action: PayloadAction<IAccount>) => ({
      ...state,
      isPending: false,
      account: action.payload,
    }));

    builder.addCase(updateAccount.fulfilled.type, (state, action: PayloadAction<AccountPayloadAction>) => ({
      ...state,
      isPending: false,
      account: action.payload.account,
      success: action.payload.success,
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
export const { resetErrorAccount, resetSuccessAccount } = accountSlice.actions;
