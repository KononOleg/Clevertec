import { AxiosResponse } from 'axios';

import {
  Book,
  BookingBookAttributes,
  BookingBookRequest,
  Category,
  CreateCommentRequest,
  CreateCommentResponse,
} from '../types';

import { $api } from './http';

export class LibraryService {
  static async getBooks(): Promise<AxiosResponse<Book[]>> {
    return $api.get<Book[]>('/api/books');
  }

  static async getBook(bookdId: string): Promise<AxiosResponse<Book>> {
    return $api.get<Book>(`/api/books/${bookdId}`);
  }

  static async getCategories(): Promise<AxiosResponse<Category[]>> {
    return $api.get<Category[]>('/api/categories');
  }

  static async createComment(
    createCommentRequest: CreateCommentRequest
  ): Promise<AxiosResponse<CreateCommentResponse>> {
    return $api.post<CreateCommentResponse>('/api/comments', {
      data: createCommentRequest,
    });
  }

  static async updateComment(
    createCommentRequest: CreateCommentRequest,
    commentId: string
  ): Promise<AxiosResponse<CreateCommentResponse>> {
    return $api.put<CreateCommentResponse>(`/api/comments/${commentId}`, {
      data: createCommentRequest,
    });
  }

  static async bokingBook(bookingBookRequest: BookingBookRequest): Promise<AxiosResponse<BookingBookAttributes>> {
    return $api.post<BookingBookAttributes>('/api/bookings', {
      data: bookingBookRequest,
    });
  }

  static async rebokingBook(
    rebookingBookRequest: BookingBookRequest,
    bookingId: string
  ): Promise<AxiosResponse<BookingBookAttributes>> {
    return $api.put<BookingBookAttributes>(`/api/bookings/${bookingId}`, {
      data: rebookingBookRequest,
    });
  }

  static async deleteBooking(bookingId: string): Promise<AxiosResponse<BookingBookAttributes>> {
    return $api.delete<BookingBookAttributes>(`/api/bookings/${bookingId}`);
  }
}
