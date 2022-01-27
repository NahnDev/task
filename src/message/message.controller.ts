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

@Controller(`room/:${pid}/message`)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  findAll(@Param(pid) projectId: string, @Query('forward') forward?: string) {
    return this.messageService.findMany(projectId, forward);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(id);
  }
}