import { AxiosResponse } from 'axios';

import { $api } from './http';

export class LibraryService {
  static async getBooks(): Promise<AxiosResponse<any>> {
    return $api.get<any>('/api/books');
  }

  static async getBook(bookdId: string): Promise<AxiosResponse<any>> {
    return $api.get<any>(`/api/books/${bookdId}`);
  }

  static async getCategories(): Promise<AxiosResponse<any>> {
    return $api.get<any>('/api/categories');
  }
}
