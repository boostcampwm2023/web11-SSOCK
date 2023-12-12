import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 1,
      stages: [
        { duration: '30s', target: 100 },
        { duration: '30s', target: 200 },
        { duration: '30s', target: 300 }
      ]
    }
  }
};

export default function () {
  for (let i = 0; i < 100; i++) {
    const res = http.get(
      'https://www.mysnowball.kr/api/user/111634878460880992241'
    );
    check(res, { 'status is 200': r => r.status == 200 });
    sleep(0.1);
  }
}
