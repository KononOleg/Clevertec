import { AxiosResponse } from 'axios';

import { IAccount, IUser } from '../types';

import { $api } from './http';

export class UserService {
  static async getUser(userId: string): Promise<AxiosResponse<IAccount>> {
    return $api.post<IAccount>(`/api/users/${userId}`);
  }

  static async updateUser(userId: string, user: IUser): Promise<AxiosResponse<IAccount>> {
    return $api.post<IAccount>(`/api/users/${userId}`, {
      ...user,
    });
  }
}
