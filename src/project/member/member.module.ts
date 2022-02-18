import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyModule } from 'src/notify/notify.module';

import { RoleModule } from 'src/project/role/role.module';
import { TaskModule } from '../task/task.module';
import { MemberListener } from './listeners/member.listener';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member, MemberSchema } from './schemas/member.schema';

@Module({
  imports: [
    RoleModule,
    MongooseModule.forFeatureAsync([
      {
        name: Member.name,
        useFactory: () => {
          const schema = MemberSchema;

          // eslint-disable-next-line
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
    NotifyModule,
  ],
  controllers: [MemberController],
  providers: [MemberService, MemberListener],
  exports: [MemberService],
})
export class MemberModule {}
