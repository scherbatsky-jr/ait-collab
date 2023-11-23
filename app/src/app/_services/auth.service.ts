import { Injectable } from '@angular/core';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.baseApiURL
  private axiosInstance = axios.create({
    baseURL: this.apiUrl,
    timeout: 10000,
  });

  constructor(private router: Router) {}

  login(username: string, password: string): Promise<AxiosResponse> {
      return this.axiosInstance
        .post('/auth/login', { username, password })
        .then((response) => {
          const accessToken = response.data.access_token;
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
            const accessToken = response.data.access_token;
            const user = response.data.user;

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('access_token', accessToken);
            
            return response;
        })
        .catch((error: AxiosError) => {
            throw error
        })
  }

  getUser() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user') as string);
    }
    
    this.logout();

    this.router.navigate(['/login']);
  }
}
