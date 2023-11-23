import axios from 'axios';
import { environment } from 'src/environments/environment';

const token = localStorage.getItem('access_token') as string;

const axiosClient = axios.create({
    baseURL: environment.baseApiURL,
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Set default headers (optional)
    },
});

export {
    axiosClient
}