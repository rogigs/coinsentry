import axios from 'axios';

const apiUrl = 'http://localhost:4000/api';

const Api = axios.create({
  baseURL: `${apiUrl}`,
});

export default Api;
