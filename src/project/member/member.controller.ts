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
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ProjectMemberService } from './member.service';
import { ProjectMember } from './schemas/project-member.schema';

@ApiBearerAuth()
@Controller('projects/:projectId/members')
export class ProjectMemberController {
  constructor(private memberService: ProjectMemberService) {}

  @ApiOkResponse({ type: [ProjectMember] })
  @Get()
  async getAll(@Param('projectId') project: string) {
    return await this.memberService.findAll(project);
  }

  @ApiOkResponse({ type: ProjectMember })
  @Post()
  async addMember(
    @Param('projectId') project: string,
    @Body() createMemberDto: CreateMemberDto,
  ) {
    return await this.memberService.create(project, createMemberDto);
  }

  @ApiOkResponse({ type: ProjectMember })
  @Patch(':userId')
  async updateMember(
    @Param('projectId') project: string,
    @Param('userId') id: string,
    @Body() UpdateMemberDto: UpdateMemberDto,
  ) {
    return await this.memberService.updateOne(project, id, UpdateMemberDto);
  }

  @ApiOkResponse()
  @Delete(':userId')
  async removeMember(
    @Param('projectId') project: string,
    @Param('userId') id: string,
  ) {
    return await this.memberService.removeOne(project, id);
  }
}
