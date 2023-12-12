import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate', // https://k6.io/docs/using-k6/scenarios/executors/constant-arrival-rate/
      duration: '30s',
      rate: 400,
      timeUnit: '1s',
      preAllocatedVUs: 1000,
      maxVUs: 1000
    }
  }
};

export default function () {
  const res = http.get(
    'https://www.mysnowball.kr/api/visit/111634878460880992241'
  );
  check(res, { 'status is 200': r => r.status == 200 });
}
