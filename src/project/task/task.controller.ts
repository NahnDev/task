import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseBoolPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './schemas/task.schema';
import { pid } from 'src/constants/PID';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { Actions } from 'src/casl/casl-ability.factory';
import { User } from 'src/user/schemas/user.schema';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { AddAssigneeDto } from './dto/add-asignee.dto';

@ApiTags('projects: tags')
@ApiBearerAuth()
@Controller(`projects/:${pid}/tasks`)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOkResponse({ type: Task })
  @CheckPolicies((ability) => ability.can(Actions.Create, Task))
  @Post()
  async create(
    @Param(pid) project: string,
    @Body() createTaskDto: CreateTaskDto,
    @RequestUser() actor: User,
  ) {
    return await this.taskService.create(project, createTaskDto, actor);
  }

  @CheckPolicies((ability) => ability.can(Actions.Read, Task))
  @ApiOkResponse({ type: [Task] })
  @Get()
  async findAll(
    @Param(pid) project: string,
    @Query('all', ParseBoolPipe) all: boolean,
  ) {
    return await this.taskService.findAll(project, all);
  }

  @CheckPolicies((ability) => ability.can(Actions.Read, Task))
  @ApiOkResponse({ type: Task })
  @Get(':id')
  async findOne(@Param(pid) project: string, @Param('id') id: string) {
    return await this.taskService.findOne(project, id);
  }

  @ApiOkResponse({ type: Task })
  @CheckPolicies((ability) => ability.can(Actions.Update, Task))
  @Patch(':id')
  async update(
    // @RequestUser() user: User,
    @Param(pid) project: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.taskService.update(project, id, updateTaskDto);
  }

  @ApiOkResponse({ type: Task })
  @CheckPolicies((ability) => ability.can(Actions.Update, Task, 'complete'))
  @ApiOkResponse({ type: Task })
  @Patch(':id/complete')
  async complete(@Param(pid) project: string, @Param('id') id: string) {
    return await this.taskService.completeTask(project, id);
  }

  @CheckPolicies((ability) => ability.can(Actions.Delete, Task))
  @Delete(':id')
  async remove(@Param(pid) project: string, @Param('id') id: string) {
    return await this.taskService.remove(project, id);
  }

  @ApiOkResponse({ type: Task })
  @CheckPolicies((ability) => ability.can(Actions.Read, Task))
  @Post(':id/subtasks')
  async addSubTask(
    @Param(pid) project: string,
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return await this.taskService.addSubTask(project, id, createTaskDto);
  }

  @ApiOkResponse({ type: Task })
  @CheckPolicies((ability) => ability.can(Actions.Update, Task, 'assignee'))
  @Post(':id/assignee')
  async addAssignee(
    @Param(pid) project: string,
    @Param('id') id: string,
    @Body() addAssignDto: AddAssigneeDto,
  ) {
    return await this.taskService.addAssignee(project, id, addAssignDto.member);
  }

  @ApiOkResponse({ type: Task })
  @CheckPolicies((ability) => ability.can(Actions.Update, Task, 'assignee'))
  @Delete(':id/assignee/:mid')
  async removeAssignee(
    @Param(pid) project: string,
    @Param('id') id: string,
    @Param('mid') member: string,
  ) {
    return await this.taskService.removeAssignee(project, id, member);
  }
}
