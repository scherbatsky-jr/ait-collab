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
 
  getConnections(): Promise<AxiosResponse> {
    return axiosClient
      .get('/user/connections')
      .then(response => {
        return response
      })
      .catch((error) => {
        throw error;
    })
  }

  getSuggestions(count: Number): Promise<AxiosResponse> {
    return axiosClient
      .get('/user/suggestions/'+count)
      .then(response => {
        return response
      })
      .catch((error) => {
        throw error;
    })
  }

  sendConnectionRequest(targetUserId: string): Promise<AxiosResponse> {
    return axiosClient
      .post('/user/send-connection-request', { targetUserId: targetUserId})
      .then(response => {
        return response
      })
      .catch((error) => {
        throw error;
    })
  }

  acceptConnectionRequest(requesterId: string): Promise<AxiosResponse> {
    return axiosClient
      .post('/user/accept-connection-request', {requesterId: requesterId})
      .then(response => {
        return response
      })
      .catch((error) => {
        throw error;
    })
  }

  getPendingConnectionRequests(): Promise<AxiosResponse> {
    return axiosClient
      .get('/user/pending-connection-requests')
      .then(response => {
        return response
      })
      .catch((error) => {
        throw error;
    })
  }

  updatePassword(data: object):  Promise<AxiosResponse> {
    return axiosClient
      .post('/user/update-password', data)
      .then(response => {
        return response
      })
      .catch((error) => {
        throw error;
    })
  }

  getUnreadNotifications(): Promise<AxiosResponse> {
    return axiosClient
      .get('/user/unread-notifications')
      .then(response => {
        return response
      })
      .catch((error) => {
        throw error;
    })
  }

  markNotificationsAsRead(ids: Array<any>): Promise<AxiosResponse> {
    return axiosClient
      .post('/user/notifications/mark-as-read', { notificationIds: ids })
      .then(response => {
        return response
      })
      .catch((error) => {
        throw error;
    })
  }

  uploadPhoto(file: File): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append('photo', file);

    return axiosClient
      .post('/user/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: [(data) => data],
      })
      .then(response => {
        return response
      })
      .catch((error) => {
        throw error;
    })
  }
}
