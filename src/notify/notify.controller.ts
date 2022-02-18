import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { OnEvent } from '@nestjs/event-emitter';
import { TaskUpdatedEvent } from 'src/project/events/task-updated.event';
import { ApiBearerAuth, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Notify } from './schemas/notify.schema';

@Controller('notifies')
@ApiBearerAuth()
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @ApiOkResponse({ type: [Notify] })
  @ApiQuery({ type: 'number', name: 'page' })
  @Get()
  async findAll(
    @RequestUser() user: User,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return await this.notifyService.findAll(user._id, page);
  }

  @ApiOkResponse({ type: Notify })
  @Get(':id')
  async findOne(@RequestUser() user: User, @Param('id') id: string) {
    return await this.notifyService.findOne(id);
  }
}
