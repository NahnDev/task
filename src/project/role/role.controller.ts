import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { pid } from 'src/constants/PID';
import { Project } from 'src/project/schemas/project.schema';
import { ApiBearerAuth, ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { Role } from './schemas/role.schema';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { Actions } from 'src/casl/casl-ability.factory';

@ApiBearerAuth()
@Controller(`projects/:${pid}/roles`)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @CheckPolicies((ability) => ability.can(Actions.Create, Role))
  @ApiOkResponse({ type: Role })
  @Post()
  create(@Param(pid) project: string, @Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(project, createRoleDto);
  }

  @CheckPolicies((ability) => ability.can(Actions.Read, Role))
  @ApiOkResponse({ type: [Role] })
  @Get()
  findAll(@Param(pid) project: string) {
    return this.roleService.findAll(project);
  }

  @CheckPolicies((ability) => ability.can(Actions.Read, Role))
  @ApiOkResponse({ type: Role })
  @Get(':id')
  findOne(@Param('id') id: string, @Param(pid) project: string) {
    return this.roleService.findOne(project, id);
  }

  @CheckPolicies((ability) => ability.can(Actions.Update, Role))
  @ApiOkResponse({ type: Role })
  @Patch(':id')
  update(
    @Param(pid) project: string,
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(project, id, updateRoleDto);
  }

  @CheckPolicies((ability) => ability.can(Actions.Create, Role))
  @Delete(':id')
  remove(@Param(pid) project: string, @Param('id') id: string) {
    return this.roleService.remove(project, id);
  }
}
