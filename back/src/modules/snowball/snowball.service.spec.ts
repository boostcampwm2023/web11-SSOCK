import { Test, TestingModule } from '@nestjs/testing';
import { SnowballService } from './snowball.service';

describe('SnowballService', () => {
  let service: SnowballService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnowballService],
    }).compile();

    service = module.get<SnowballService>(SnowballService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
