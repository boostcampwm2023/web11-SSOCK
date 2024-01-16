import { captureException } from '@sentry/react';
import axios from 'axios';

const instance = axios.create();

instance.interceptors.response.use(
  response => response, // 성공적인 응답 처리
  error => {
    // 오류 처리
    if (error.response && error.response.status !== 409) {
      captureException(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
