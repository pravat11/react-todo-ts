import axios from 'axios';

import config from '../config';
import store from '../store/configureStore';

const http = axios.create({
  baseURL: config.baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use(request => {
  const session = store.getState().app.session;

  if (session && session.token) {
    request.headers['token'] = session.token;
  }

  return request;
});

export default http;
