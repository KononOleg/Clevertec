import { AxiosResponse } from 'axios';

import { IAccount, IUser } from '../types';

import { $api } from './http';

export class AccountService {
  static async getAccount(userId: string): Promise<AxiosResponse<IAccount>> {
    return $api.get<IAccount>(`/api/users/${userId}`);
  }

  static async updateAccount(userId: string, user: IUser): Promise<AxiosResponse<IAccount>> {
    return $api.post<IAccount>(`/api/users/${userId}`, {
      ...user,
    });
  }
}
