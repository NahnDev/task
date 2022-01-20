import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Task } from './schemas/task.schema';
import { PID } from 'src/constants/PID';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { Actions } from 'src/casl/casl-ability.factory';
import { User } from 'src/user/schemas/user.schema';
import { RequestUser } from 'src/decorators/request-user.decorator';

@ApiBearerAuth()
@Controller(`projects/:${PID}/tasks`)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOkResponse({ type: Task })
  @CheckPolicies((ability) => ability.can(Actions.Create, Task))
  @Post()
  async create(
    @Param(PID) project: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return await this.taskService.create(project, createTaskDto);
  }

  @CheckPolicies((ability) => ability.can(Actions.Read, Task))
  @ApiOkResponse({ type: [Task] })
  @Get()
  async findAll(@Param(PID) project: string) {
    return await this.taskService.findAll(project);
  }

  @CheckPolicies((ability) => ability.can(Actions.Read, Task))
  @ApiOkResponse({ type: Task })
  @Get(':id')
  async findOne(@Param(PID) project: string, @Param('id') id: string) {
    return await this.taskService.findOne(project, id);
  }

  @ApiOkResponse({ type: Task })
  @CheckPolicies((ability) => ability.can(Actions.Update, Task))
  @Patch(':id')
  async update(
    // @RequestUser() user: User,
    @Param(PID) project: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.taskService.update(project, id, updateTaskDto);
  }

  @CheckPolicies((ability) => ability.can(Actions.Delete, Task))
  @Delete(':id')
  async remove(@Param(PID) project: string, @Param('id') id: string) {
    return await this.taskService.remove(project, id);
  }

  @CheckPolicies((ability) => ability.can(Actions.Read, Task))
  @ApiOkResponse({ type: Task })
  @Post(':id/subtasks')
  async addSubTask(
    @Param(PID) project: string,
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return await this.taskService.addSubTask(project, id, createTaskDto);
  }
}
