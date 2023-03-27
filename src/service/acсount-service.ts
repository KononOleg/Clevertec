import { AxiosResponse } from 'axios';

import { API_PATH } from '../constants';
import { Account, UpdateAccountResponse, UploadFileResponse } from '../types';

import { $api } from './http';

export class AccountService {
  static async getAccount(): Promise<AxiosResponse<Account>> {
    return $api.get<Account>(API_PATH.account);
  }

  static async updateAccount(userId: string, user: UpdateAccountResponse): Promise<AxiosResponse<Account>> {
    return $api.put<Account>(`${API_PATH.users}${userId}`, {
      ...user,
    });
  }

  static async uploadFile(files: FormData): Promise<AxiosResponse<UploadFileResponse[]>> {
    return $api.post<UploadFileResponse[]>(API_PATH.file, files);
  }

  static async updateAvatar(userId: string, avatar: string): Promise<AxiosResponse<Account>> {
    return $api.put<Account>(`${API_PATH.users}${userId}`, {
      avatar,
    });
  }
}
