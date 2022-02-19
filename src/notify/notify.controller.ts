import { Controller, Get, Param, Query } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { OnEvent } from '@nestjs/event-emitter';
import { TaskUpdatedEvent } from 'src/project/events/task-updated.event';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Notify } from './schemas/notify.schema';
import { IsNumber, IsOptional } from 'class-validator';
import { FindAllNotifyQuery } from './dto/findAll-notify.query';

@ApiTags('notifies')
@Controller('notifies')
@ApiBearerAuth()
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @ApiOkResponse({ type: [Notify] })
  @ApiQuery({ type: 'number', name: 'page', required: false })
  @Get()
  async findAll(
    @RequestUser() user: User,
    @Query() { page }: FindAllNotifyQuery,
  ) {
    page = Math.max(page, 0);
    return await this.notifyService.findAll(user._id, page);
  }

  @ApiOkResponse({ type: Notify })
  @Get(':id')
  async findOne(@RequestUser() user: User, @Param('id') id: string) {
    return await this.notifyService.findOne(id);
  }
}
