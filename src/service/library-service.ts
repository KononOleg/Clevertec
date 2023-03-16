import { AxiosResponse } from 'axios';

import {
  BookingBookAttributes,
  BookingBookRequest,
  CreateCommentRequest,
  CreateCommentResponse,
  IBook,
  ICategory,
} from '../types';

import { $api } from './http';

export class LibraryService {
  static async getBooks(): Promise<AxiosResponse<IBook[]>> {
    return $api.get<IBook[]>('/api/books');
  }

  static async getBook(bookdId: string): Promise<AxiosResponse<IBook>> {
    return $api.get<IBook>(`/api/books/${bookdId}`);
  }

  static async getCategories(): Promise<AxiosResponse<ICategory[]>> {
    return $api.get<ICategory[]>('/api/categories');
  }

  static async createComment(
    createCommentRequest: CreateCommentRequest
  ): Promise<AxiosResponse<CreateCommentResponse>> {
    return $api.post<CreateCommentResponse>('/api/comments', {
      data: createCommentRequest,
    });
  }

  static async bokingBook(bookingBookRequest: BookingBookRequest): Promise<AxiosResponse<BookingBookAttributes>> {
    return $api.post<BookingBookAttributes>('/api/bookings', {
      data: bookingBookRequest,
    });
  }
}
