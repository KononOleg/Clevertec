import { AxiosResponse } from 'axios';

import { AuthResponse, SignUpRequest } from '../types';

import { $api } from './http';

export class AuthService {
  static async signIn(identifier: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/api/auth/local', {
      identifier,
      password,
    });
  }

  static async signUp(signUpRequest: SignUpRequest): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/api/auth/local/register', {
      ...signUpRequest,
    });
  }

  static async resetPassword(email: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/api/auth/forgot-password', {
      email,
    });
  }

  static async recoveryPassword(
    password: string,
    passwordConfirmation: string,
    code: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/api/auth/reset-password', {
      password,
      passwordConfirmation,
      code,
    });
  }
}
