import axios from 'axios';
import Cookies from 'js-cookie';

const backendUrl = 'http://localhost:4000/api'; // TODO: put this in a .env

const withoutToken = axios.create({
  baseURL: `${backendUrl}`,
  headers: {
    'Access-Control-Allow-Headers': 'Authorization',
  },
});

const withToken = axios.create({
  baseURL: `${backendUrl}`,
  withCredentials: true,
});

withoutToken.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

withToken.interceptors.request.use(
  async (config) => {
    const hasToken = await Cookies.get('accessToken');

    if (!hasToken) {
      // TODO: refresh token
    } else {
      config.headers.Authorization = hasToken;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default {
  withToken,
  withoutToken,
};
