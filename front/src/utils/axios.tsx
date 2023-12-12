import axios from 'axios';
import * as Sentry from '@sentry/react';

const instance = axios.create();

instance.interceptors.response.use(
  response => response, // 성공적인 응답 처리
  error => {
    // 오류 처리
    if (error.response && error.response.status !== 409) {
      Sentry.captureException(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
