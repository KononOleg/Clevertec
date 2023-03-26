import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { isPendingAction, isRejectedAction } from '../../helpers';
import { Account, AccountPayloadAction, Error, Success } from '../../types';
import { getAccount, updateAccount, uploadFile } from '../thunks/account-thunks';

type AccountSliceState = {
  account: Account | null;
  isPending: boolean;
  success: Success | null;
  error: Error | null;
};

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
    builder
      .addCase(getAccount.fulfilled, (state, action: PayloadAction<Account>) => ({
        ...state,
        isPending: false,
        account: action.payload,
      }))

      .addCase(updateAccount.fulfilled, (state, action: PayloadAction<AccountPayloadAction>) => ({
        ...state,
        isPending: false,
        account: action.payload.account,
        success: action.payload.success,
      }))

      .addCase(uploadFile.fulfilled, (state, action: PayloadAction<AccountPayloadAction>) => ({
        ...state,
        isPending: false,
        account: action.payload.account,
        success: action.payload.success,
      }))

      .addMatcher(isPendingAction('account'), (state) => ({ ...state, isPending: true }))

      .addMatcher(isRejectedAction('account'), (state, action) => ({
        ...state,
        isPending: false,
        error: action.payload,
      }));
  },
});
export const { resetErrorAccount, resetSuccessAccount } = accountSlice.actions;
