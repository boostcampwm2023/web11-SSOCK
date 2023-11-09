import { Test, TestingModule } from '@nestjs/testing';
import { SnowballController } from './snowball.controller';

describe('SnowballController', () => {
  let controller: SnowballController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnowballController],
    }).compile();

    controller = module.get<SnowballController>(SnowballController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
