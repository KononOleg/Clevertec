import { AxiosResponse } from 'axios';

import { IAccount, UpdateAccountResponse } from '../types';

import { $api } from './http';

export class AccountService {
  static async getAccount(): Promise<AxiosResponse<IAccount>> {
    return $api.get<IAccount>('/api/users/me');
  }

  static async updateAccount(userId: string, user: UpdateAccountResponse): Promise<AxiosResponse<IAccount>> {
    return $api.put<IAccount>(`/api/users/${userId}`, {
      ...user,
    });
  }
}
