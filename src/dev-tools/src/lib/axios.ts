import defaultAxios from 'axios';
const axios = defaultAxios.create({
  baseURL: '/api/v1',
});

export default axios;
