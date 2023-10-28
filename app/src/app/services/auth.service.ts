import { Injectable } from '@angular/core';
import axios, { AxiosResponse, AxiosError } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:20178'; // Set your API URL
  private axiosInstance = axios.create({
    baseURL: this.apiUrl,
    timeout: 10000, // Adjust the timeout as needed
  });

  login(username: string, password: string): Promise<AxiosResponse> {
      return this.axiosInstance
        .post('/auth/login', { username, password })
        .then((response) => {
          const accessToken = response.data.token;
          const user = response.data.user;

          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('access_token', accessToken);

          return response;
        })
        .catch((error: AxiosError) => {
          throw error;
        });
  }

  logout(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  register(data: object): Promise<AxiosResponse> {
    return this.axiosInstance
        .post('/auth/register', data)
        .then((response) => {
            const accessToken = response.data.token;
            const user = response.data.user;

            localStorage.setItem('user', user);
            localStorage.setItem('access_token', accessToken);
            
            return response;
        })
        .catch((error: AxiosError) => {
            throw error
        })
  }

  getUser(): object {
    return JSON.parse(JSON.stringify(localStorage.getItem('user')));
  }
}
