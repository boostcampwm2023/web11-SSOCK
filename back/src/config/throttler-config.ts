import { ThrottlerModuleOptions } from '@nestjs/throttler';

const throttlerConfig: ThrottlerModuleOptions = {
  throttlers: [
    {
      ttl: 10000, // 10 seconds
      limit: 30
    }
  ],
  errorMessage: 'Too Many Requests'
};

export default throttlerConfig;
