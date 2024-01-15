import axios from 'axios';

const apiUrl = 'https://api-coin-sentry-git-main-rogigs.vercel.app/api';

const Api = axios.create({
  baseURL: `${apiUrl}`,
});

export default Api;
