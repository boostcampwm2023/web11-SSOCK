import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      duration: '30s',
      rate: 400,
      preAllocatedVUs: 1000
    }
  }
};

export default function () {
  const res = http.get(
    'https://www.mysnowball.kr/api/user/111634878460880992241'
  );
  check(res, { 'status is 200': r => r.status == 200 });
}
