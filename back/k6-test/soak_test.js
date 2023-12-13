import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '5m', target: 100 },
    { duration: '4h', target: 100 },
    { duration: '5m', target: 0 }
  ]
};

export default function () {
  const res = http.get(
    'https://www.mysnowball.kr/api/user/111634878460880992241'
  );
  check(res, { 'status is 200': r => r.status == 200 });
  sleep(0.5);
}
