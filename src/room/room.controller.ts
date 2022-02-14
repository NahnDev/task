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
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  findAll(@RequestUser() user: User) {
    return this.roomService.findAll(user._id);
  }
}
