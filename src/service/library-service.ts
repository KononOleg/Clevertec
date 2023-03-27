import { AxiosResponse } from 'axios';

import { API_PATH } from '../constants';
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
    return $api.get<Book[]>(API_PATH.getBooks);
  }

  static async getBook(bookdId: string): Promise<AxiosResponse<Book>> {
    return $api.get<Book>(`${API_PATH.books}${bookdId}`);
  }

  static async getCategories(): Promise<AxiosResponse<Category[]>> {
    return $api.get<Category[]>(API_PATH.categories);
  }

  static async createComment(
    createCommentRequest: CreateCommentRequest
  ): Promise<AxiosResponse<CreateCommentResponse>> {
    return $api.post<CreateCommentResponse>(API_PATH.comments, {
      data: createCommentRequest,
    });
  }

  static async updateComment(
    createCommentRequest: CreateCommentRequest,
    commentId: string
  ): Promise<AxiosResponse<CreateCommentResponse>> {
    return $api.put<CreateCommentResponse>(`${API_PATH.comments}${commentId}`, {
      data: createCommentRequest,
    });
  }

  static async bokingBook(bookingBookRequest: BookingBookRequest): Promise<AxiosResponse<BookingBookAttributes>> {
    return $api.post<BookingBookAttributes>(API_PATH.bookings, {
      data: bookingBookRequest,
    });
  }

  static async rebokingBook(
    rebookingBookRequest: BookingBookRequest,
    bookingId: string
  ): Promise<AxiosResponse<BookingBookAttributes>> {
    return $api.put<BookingBookAttributes>(`${API_PATH.bookings}${bookingId}`, {
      data: rebookingBookRequest,
    });
  }

  static async deleteBooking(bookingId: string): Promise<AxiosResponse<BookingBookAttributes>> {
    return $api.delete<BookingBookAttributes>(`${API_PATH.bookings}${bookingId}`);
  }
}
