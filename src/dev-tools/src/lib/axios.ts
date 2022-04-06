import defaultAxios from 'axios';

export const baseURL = '/api/v1';

const axios = defaultAxios.create({
  baseURL,
});

export default axios;
