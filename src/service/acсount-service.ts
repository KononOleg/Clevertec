import { AxiosResponse } from 'axios';

import { IAccount, UpdateAccountResponse } from '../types';

import { $api } from './http';

export class AccountService {
  static async getAccount(userId: string): Promise<AxiosResponse<IAccount>> {
    return $api.get<IAccount>(`/api/users/${userId}`);
  }

  static async updateAccount(userId: string, user: UpdateAccountResponse): Promise<AxiosResponse<IAccount>> {
    return $api.put<IAccount>(`/api/users/${userId}`, {
      ...user,
    });
  }
}
