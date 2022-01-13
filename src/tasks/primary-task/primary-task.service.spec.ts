import { Test, TestingModule } from '@nestjs/testing';
import { PrimaryTaskService } from './primary-task.service';

describe('PrimaryTaskService', () => {
  let service: PrimaryTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrimaryTaskService],
    }).compile();

    service = module.get<PrimaryTaskService>(PrimaryTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
