import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PublicAPI } from 'src/decorators/public.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { ParseObjectIdPipe } from '../pipes/parse-objectId.pipe';

@PublicAPI()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: User })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiOkResponse({ type: [User] })
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiOkResponse({ type: User })
  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: string) {
    console.log(id);
    return await this.usersService.findOne(null, id);
  }

  @ApiOkResponse({ type: User })
  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @ApiOkResponse()
  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: string) {
    return await this.usersService.remove(+id);
  }
}
