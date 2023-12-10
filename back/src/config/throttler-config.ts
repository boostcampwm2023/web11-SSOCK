import { ThrottlerModuleOptions } from '@nestjs/throttler';

const throttlerConfig: ThrottlerModuleOptions = {
  throttlers: [
    {
      name: 'api',
      ttl: 5000, // 5 seconds
      limit: 5
    }
  ],
  errorMessage: 'Too Many API Requests'
};

export default throttlerConfig;
