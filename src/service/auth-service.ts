import { AxiosResponse } from 'axios';

import { API_PATH } from '../constants';
import { AuthResponse, SignUpRequest } from '../types';

import { $api } from './http';

export class AuthService {
  static async signIn(identifier: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(API_PATH.local, {
      identifier,
      password,
    });
  }

  static async signUp(signUpRequest: SignUpRequest): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(API_PATH.register, {
      ...signUpRequest,
    });
  }

  static async resetPassword(email: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(API_PATH.forgotPassword, {
      email,
    });
  }

  static async recoveryPassword(
    password: string,
    passwordConfirmation: string,
    code: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>(API_PATH.resetPassword, {
      password,
      passwordConfirmation,
      code,
    });
  }
}
