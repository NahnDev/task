import { Controller, Get, Post, UseGuards, Query, Body } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { PublicAPI } from 'src/decorators/public.decorator';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@PublicAPI()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    },
  })
  @Get('token')
  async getToken(@Query('refreshToken') refreshToken: string) {
    return await this.authService.getTokenWithRefresh(refreshToken);
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: { email: { type: 'string' }, password: { type: 'string' } },
    },
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
        refreshToken: { type: 'string' },
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@RequestUser() user: User) {
    return await this.authService.getToken(user);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google-login')
  async googleLogin(@RequestUser() user: User) {
    console.log(user);
    return await this.authService.getToken(user);
  }
}
