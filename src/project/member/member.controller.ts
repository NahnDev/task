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
import { pid } from 'src/constants/PID';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberService } from './member.service';
import { Member } from './schemas/member.schema';

@ApiBearerAuth()
@Controller(`projects/:${pid}/members`)
export class MemberController {
  constructor(private memberService: MemberService) {}

  @ApiOkResponse({ type: [Member] })
  @CheckPolicies((ability) => ability.can(Actions.Read, Member))
  @Get()
  async getAll(@Param(pid) project: string) {
    return await this.memberService.findAll(project);
  }

  @ApiOkResponse({ type: Member })
  @Post()
  @CheckPolicies((ability) => ability.can(Actions.Create, Member))
  async addMember(
    @Param(pid) project: string,
    @Body() createMemberDto: CreateMemberDto,
  ) {
    return await this.memberService.create(project, createMemberDto);
  }

  @CheckPolicies((ability) => ability.can(Actions.Update, Member))
  @ApiOkResponse({ type: Member })
  @Patch(':userId')
  async updateMember(
    @Param(pid) project: string,
    @Param('userId') id: string,
    @Body() UpdateMemberDto: UpdateMemberDto,
  ) {
    return await this.memberService.updateOne(project, id, UpdateMemberDto);
  }

  @ApiOkResponse()
  @CheckPolicies((ability) => ability.can(Actions.Delete, Member))
  @Delete(':userId')
  async removeMember(@Param(pid) project: string, @Param('userId') id: string) {
    return await this.memberService.remove(project, id);
  }
}
