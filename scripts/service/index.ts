import axios from 'axios';
import ServiceCall from '@smartface/extension-utils/lib/service-call';

const service = new ServiceCall({
  baseUrl: 'https://api.infinitewords.uk/api/guess'
});

// axios.create({
//   baseURL: 'https://word.digitalnook.net/api/v1',
//   timeout: 10000
// });

export default service;
