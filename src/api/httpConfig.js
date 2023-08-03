import axios from "axios";

const apiUrl = "https://test-sense-data-0aca56247e9f.herokuapp.com/";

const Api = axios.create({
  baseURL: `${apiUrl}`,
});

export default Api;
