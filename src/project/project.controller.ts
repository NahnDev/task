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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Project } from './schemas/project.schema';
import { User } from 'src/user/schemas/user.schema';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { pid } from 'src/constants/PID';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { Actions } from 'src/casl/casl-ability.factory';

@ApiTags('projects')
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
  @Get(`:${pid}`)
  findOne(@Param(pid) id: string) {
    return this.projectService.findOne(id);
  }

  @CheckPolicies((ability) => ability.can(Actions.Update, Project))
  @ApiOkResponse({ type: Project })
  @Patch(`:${pid}`)
  update(@Param(pid) id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @CheckPolicies((ability) => ability.can(Actions.Delete, Project))
  @Delete(`:${pid}`)
  remove(@Param(pid) id: string) {
    return this.projectService.remove(id);
  }
}
