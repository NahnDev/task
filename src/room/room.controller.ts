import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { MemberService } from 'src/project/member/member.service';
import { User } from 'src/user/schemas/user.schema';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Room } from './schemas/room.schema';
import { Actions } from 'src/casl/casl-ability.factory';
import { CheckPolicies } from 'src/decorators/check-policies.decorator';

@ApiTags('messages')
@ApiBearerAuth()
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  @ApiOkResponse({ type: [Room] })
  async findAll(@RequestUser() user: User): Promise<Room[]> {
    return await this.roomService.findAll(user._id);
  }
}