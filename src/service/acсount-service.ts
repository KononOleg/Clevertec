import { AxiosResponse } from 'axios';

import { IAccount, UpdateAccountResponse, UploadFileResponse } from '../types';

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

  static async uploadFile(files: FormData): Promise<AxiosResponse<UploadFileResponse[]>> {
    return $api.post<UploadFileResponse[]>('/api/upload', files);
  }

  static async updateAvatar(userId: string, avatar: string): Promise<AxiosResponse<IAccount>> {
    return $api.put<IAccount>(`/api/users/${userId}`, {
      avatar,
    });
  }
}
