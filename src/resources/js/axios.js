import axios from 'axios';

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

const getCsrfToken = async () => {
  await axios.get('/sanctum/csrf-cookie');
};

axiosClient.interceptors.request.use(async config => {
  await getCsrfToken();
  return config;
});

axiosClient.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default axiosClient;
