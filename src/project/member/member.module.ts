import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from 'src/project/role/role.module';
import { TaskModule } from '../task/task.module';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member, MemberSchema } from './schemas/member.schema';

@Module({
  imports: [
    RoleModule,
    MongooseModule.forFeature([
      {
        name: Member.name,
        schema: MemberSchema,
      },
    ]),
  ],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
