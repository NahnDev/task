import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { PublicAPI } from 'src/decorators/public.decorator';

import { CreatePrimaryTaskDto } from '../dto/create-primary-task.dto';
import { UpdateTaskDto } from '../dto/update-primary-task.dto';
import { PrimaryTask } from '../schemas/task.schema';
import { PrimaryTaskService } from './primary-task.service';

@PublicAPI()
@Controller('primary-tasks')
export class PrimaryTaskController {
  constructor(private readonly primaryTaskService: PrimaryTaskService) {}

  @Post()
  @ApiOkResponse({ type: PrimaryTask })
  async create(@Body() createTaskDto: CreatePrimaryTaskDto) {
    return await this.primaryTaskService.create(createTaskDto);
  }

  @Get()
  @ApiOkResponse({ type: [PrimaryTask] })
  async findAll(@Query('project') project: string) {
    return await this.primaryTaskService.findAllInProject(project);
  }

  @Get(':id')
  @ApiOkResponse({ type: PrimaryTask })
  async findOne(@Param('id') id: string) {
    return await this.primaryTaskService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PrimaryTask })
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return await this.primaryTaskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PrimaryTask })
  async remove(@Param('id') id: string) {
    return await this.primaryTaskService.remove(id);
  }
}
