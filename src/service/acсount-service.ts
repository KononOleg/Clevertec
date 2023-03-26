import { AxiosResponse } from 'axios';

import { Account, UpdateAccountResponse, UploadFileResponse } from '../types';

import { $api } from './http';

export class AccountService {
  static async getAccount(): Promise<AxiosResponse<Account>> {
    return $api.get<Account>('/api/users/me');
  }

  static async updateAccount(userId: string, user: UpdateAccountResponse): Promise<AxiosResponse<Account>> {
    return $api.put<Account>(`/api/users/${userId}`, {
      ...user,
    });
  }

  static async uploadFile(files: FormData): Promise<AxiosResponse<UploadFileResponse[]>> {
    return $api.post<UploadFileResponse[]>('/api/upload', files);
  }

  static async updateAvatar(userId: string, avatar: string): Promise<AxiosResponse<Account>> {
    return $api.put<Account>(`/api/users/${userId}`, {
      avatar,
    });
  }
}
