import axios from 'axios';

const token = localStorage.getItem('access_token') as string;

const axiosClient = axios.create({
    baseURL: 'http://localhost:20178',
    timeout: 5000,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', // Set default headers (optional)
    },
});

export {
    axiosClient
}