import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  scenarios: {
    contacts: {
      executor: 'constant-vus', // https://k6.io/docs/using-k6/scenarios/executors/constant-arrival-rate/
      vus: 10,
      duration: '90s'
    }
  }
};

export default function () {
  for (let i = 0; i < 100; i++) {
    const res = http.get('https://www.mysnowball.kr/api/snowball/73');
    check(res, { 'status is 200': r => r.status == 200 });
    sleep(0.1);
  }
}
