import { Injectable } from '@angular/core';
import { axiosClient } from '../_axios/axiosClient'
import { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  updateUser(data: object): Promise<AxiosResponse> {
    return axiosClient
        .post('/user/update', data)
        .then((response) => {
            const updatedUser = response.data

            localStorage.setItem('user', JSON.stringify(updatedUser));

            return response;
        })
        .catch((error) => {
            throw error;
        })
  }
 
}
