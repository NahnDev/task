import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Project } from './schemas/project.schema';
import { User } from 'src/user/schemas/user.schema';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { PID } from 'src/constants/PID';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { Actions } from 'src/casl/casl-ability.factory';

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
  @CheckPolicies((ability) => ability.can(Actions.Read, Project))
  @Get(`:${PID}`)
  findOne(@Param(PID) id: string) {
    return this.projectService.findOne(id);
  }

  @CheckPolicies((ability) => ability.can(Actions.Update, Project))
  @ApiOkResponse({ type: Project })
  @Patch(`:${PID}`)
  update(@Param(PID) id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @CheckPolicies((ability) => ability.can(Actions.Delete, Project))
  @Delete(`:${PID}`)
  remove(@Param(`PID`) id: string) {
    return this.projectService.remove(id);
  }
}
