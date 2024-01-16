import axios from 'axios';

const backendUrl = 'http://localhost:4000/api'; // TODO: put this in a .env

const withoutToken = axios.create({
  baseURL: `${backendUrl}`,
});

const withToken = axios.create({
  baseURL: `${backendUrl}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

withToken.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null; // TODO: change control of token
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default {
  withToken,
  withoutToken,
};
