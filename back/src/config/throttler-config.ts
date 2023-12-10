import { ThrottlerModuleOptions } from '@nestjs/throttler';

const throttlerConfig: ThrottlerModuleOptions = {
  throttlers: [
    {
      name: 'api',
      ttl: 10000, // 10 seconds
      limit: 30,
      skipIf: context => {
        // api route로 시작하지 않는 요청은 제외
        const req = context.switchToHttp().getRequest();
        return req.route.path.startsWith('/api') ? false : true;
      }
    }
  ],
  errorMessage: 'Too Many API Requests'
};

export default throttlerConfig;
