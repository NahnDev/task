import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { PublicAPI } from 'src/decorators/public.decorator';
import { StringOrObjectId } from 'src/types/StringOrObjectId';
import { CreateSubTaskDTo } from '../dto/create-subTask.dto';
import { UpdateSubTaskDto } from '../dto/update-subTask.dto';
import { SubTask } from '../schemas/task.schema';
import { SubtasksService } from './subtasks.service';

@PublicAPI()
@Controller('sub-tasks')
export class SubtasksController {
  constructor(private subTaskService: SubtasksService) {}

  @ApiOkResponse({ type: SubTask })
  @Post()
  async create(@Body() CreateSubTaskDTo: CreateSubTaskDTo) {
    return await this.subTaskService.create(CreateSubTaskDTo);
  }

  @Get()
  @ApiOkResponse({ type: [SubTask] })
  async findAll(@Query('parent') parent: StringOrObjectId) {
    return await this.subTaskService.findAllInParentTask(parent);
  }

  @Get(':id')
  @ApiOkResponse({ type: SubTask })
  async findOne(@Param() id: StringOrObjectId) {
    return await this.subTaskService.findOne(id);
  }

  @ApiOkResponse({ type: SubTask })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateSubTaskDto,
  ) {
    return await this.subTaskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.subTaskService.remove(id);
  }
}
