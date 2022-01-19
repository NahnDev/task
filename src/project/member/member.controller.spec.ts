import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMemberController } from './member.controller';

describe('MemberController', () => {
  let controller: ProjectMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectMemberController],
    }).compile();

    controller = module.get<ProjectMemberController>(ProjectMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
