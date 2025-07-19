const axios = require('axios');
require('dotenv').config();

const instance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000, // 5 second timeout
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

module.exports = {
  get: (url, config = {}) => instance.get(url, config),
  post: (url, data, config = {}) => instance.post(url, data, config),
  put: (url, data, config = {}) => instance.put(url, data, config),
  delete: (url, config = {}) => instance.delete(url, config),
};
