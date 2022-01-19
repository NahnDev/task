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

@ApiBearerAuth()
@Controller('projects/:projectId/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOkResponse({ type: Task })
  @Post()
  async create(
    @Param('projectId') project: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return await this.taskService.create(project, createTaskDto);
  }

  @ApiOkResponse({ type: [Task] })
  @Get()
  async findAll(@Param('projectId') project: string) {
    return await this.taskService.findAll(project);
  }

  @ApiOkResponse({ type: Task })
  @Get(':id')
  async findOne(@Param('projectId') project: string, @Param('id') id: string) {
    return await this.taskService.findOne(project, id);
  }

  @ApiOkResponse({ type: Task })
  @Patch(':id')
  async update(
    @Param('projectId') project: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.taskService.update(project, id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('projectId') project: string, @Param('id') id: string) {
    return await this.taskService.remove(project, id);
  }

  @ApiOkResponse({ type: Task })
  @Post(':id/subtasks')
  async addSubTask(
    @Param('projectId') project: string,
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return await this.taskService.addSubTask(project, id, createTaskDto);
  }
}
