import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Project } from './schemas/project.schema';
import { User } from 'src/user/schemas/user.schema';
import { RequestUser } from 'src/decorators/request-user.decorator';

@ApiBearerAuth()
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOkResponse({ type: Project })
  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @RequestUser() user: User,
  ) {
    return this.projectService.create(user, createProjectDto);
  }

  @ApiOkResponse({ type: [Project] })
  @Get()
  findAll(@RequestUser() user: User) {
    console.log('----------------------------');
    return this.projectService.findAllByUser(user._id);
  }

  @ApiOkResponse({ type: Project })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @ApiOkResponse({ type: Project })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
