import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '2m', target: 150 },
        { duration: '5m', target: 150 },
        { duration: '2m', target: 0 }
      ]
    }
  }
};

export default function () {
  const res = http.get(
    'https://www.mysnowball.kr/api/user/111634878460880992241'
  );
  check(res, { 'status is 200': r => r.status == 200 });
  sleep(0.5);
}
