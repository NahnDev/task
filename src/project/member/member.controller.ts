import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { Actions } from 'src/casl/casl-ability.factory';
import { PID } from 'src/constants/PID';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ProjectMemberService } from './member.service';
import { ProjectMember } from './schemas/project-member.schema';

@ApiBearerAuth()
@Controller(`projects/:${PID}/members`)
export class ProjectMemberController {
  constructor(private memberService: ProjectMemberService) {}

  @ApiOkResponse({ type: [ProjectMember] })
  @CheckPolicies((ability) => ability.can(Actions.Read, ProjectMember))
  @Get()
  async getAll(@Param(PID) project: string) {
    return await this.memberService.findAll(project);
  }

  @ApiOkResponse({ type: ProjectMember })
  @Post()
  @CheckPolicies((ability) => ability.can(Actions.Create, ProjectMember))
  async addMember(
    @Param(PID) project: string,
    @Body() createMemberDto: CreateMemberDto,
  ) {
    return await this.memberService.create(project, createMemberDto);
  }

  @CheckPolicies((ability) => ability.can(Actions.Update, ProjectMember))
  @ApiOkResponse({ type: ProjectMember })
  @Patch(':userId')
  async updateMember(
    @Param(PID) project: string,
    @Param('userId') id: string,
    @Body() UpdateMemberDto: UpdateMemberDto,
  ) {
    return await this.memberService.updateOne(project, id, UpdateMemberDto);
  }

  @ApiOkResponse()
  @CheckPolicies((ability) => ability.can(Actions.Delete, ProjectMember))
  @Delete(':userId')
  async removeMember(@Param(PID) project: string, @Param('userId') id: string) {
    return await this.memberService.removeOne(project, id);
  }
}
