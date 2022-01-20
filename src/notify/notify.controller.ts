import { Controller, Get, Param } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { OnEvent } from '@nestjs/event-emitter';
import { TaskUpdatedEvent } from 'src/project/events/task-updated.event';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('notify')
@ApiBearerAuth()
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Get()
  async findAll(@RequestUser() user: User) {
    return await this.notifyService.findAll(user._id);
  }

  @Get(':id')
  async findOne(@RequestUser() user: User, @Param('id') id: string) {
    return await this.notifyService.findOne(id);
  }
}
