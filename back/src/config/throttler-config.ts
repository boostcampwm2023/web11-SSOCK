import { ThrottlerModuleOptions } from '@nestjs/throttler';

const throttlerConfig: ThrottlerModuleOptions = {
  throttlers: [
    {
      ttl: 10,
      limit: 3
    }
  ],
  errorMessage: 'Too Many Requests'
};

export default throttlerConfig;
