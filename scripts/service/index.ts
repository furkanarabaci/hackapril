import axios from 'axios';

const service = axios.create({
  baseURL: 'https://word.digitalnook.net/api/v1',
  timeout: 10000
});

export default service;
