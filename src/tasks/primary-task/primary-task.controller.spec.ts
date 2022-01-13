import { Test, TestingModule } from '@nestjs/testing';
import { PrimaryTaskController } from './primary-task.controller';

describe('PrimaryTaskController', () => {
  let controller: PrimaryTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrimaryTaskController],
    }).compile();

    controller = module.get<PrimaryTaskController>(PrimaryTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
