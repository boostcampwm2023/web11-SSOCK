import { ThrottlerModuleOptions } from '@nestjs/throttler';

const throttlerConfig: ThrottlerModuleOptions = {
  throttlers: [
    {
      name: 'api',
      ttl: 10000, // 1 seconds
      limit: 30
    }
  ],
  errorMessage: 'Too Many API Requests'
};

export default throttlerConfig;
