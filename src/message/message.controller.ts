import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { pid } from 'src/constants/PID';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { Actions } from 'src/casl/casl-ability.factory';
import { Message } from './schemas/message.schema';

@ApiBearerAuth()
@Controller(`rooms/:${pid}/messages`)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiQuery({ name: 'forward', required: false })
  @CheckPolicies((ability) => ability.can(Actions.Read, Message))
  @Get()
  findAll(@Param(pid) projectId: string, @Query('forward') forward?: string) {
    return this.messageService.findMany(projectId, forward);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}
