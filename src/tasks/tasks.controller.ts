import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { PublicAPI } from 'src/decorators/public.decorator';
import { Task } from './schemas/task.schema';
import { TasksService } from './tasks.service';

@PublicAPI()
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @ApiOkResponse({ type: [Task] })
  async findAllInProject(@Query('project') project: string) {
    return await this.tasksService.findAllInProject(project);
  }
}
