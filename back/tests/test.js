import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate', // https://k6.io/docs/using-k6/scenarios/executors/constant-arrival-rate/
      duration: '30s',
      rate: 100,
      timeUnit: '1s',
      preAllocatedVUs: 1000,
      maxVUs: 1000
    }
  },
  thresholds: {
    http_req_duration: ['p(95)<50']
  }
};

export default function () {
  const url = 'https://www.mysnowball.kr/api/snowball/1';

  const response = http.get(url);

  check(response, {
    success: res => res.status === 200
  });
}
