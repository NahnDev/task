import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { ACTIVE_TOKEN_QUERY } from 'src/constants/ACTIVE_TOKEN_QUERY';
import { USER_ACTIVE } from 'src/enums/user-active.enum';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRole } from 'src/user/schemas/user-role.class';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { USER_ROLE } from 'src/constants/user.role';
import { RoleService } from 'src/project/role/role.service';
import { MemberService } from 'src/project/member/member.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private memberService: MemberService,
    private roleService: RoleService,
    private configService: ConfigService,
    private mailService: MailService,
  ) {}
  async validateWithMail(email: string, password: string): Promise<User> {
    const passWd = await this.userService.getPasswordByEmail(email);
    if (!passWd) throw new UnauthorizedException('Not found email');
    if (!this.userService.verifyPassWd(password, passWd))
      throw new UnauthorizedException('password incorrect');

    const user = await this.userService.findByEmail(email);
    if (user.active === USER_ACTIVE.BLOCK)
      throw new UnauthorizedException('My account blocked');
    if (user.active === USER_ACTIVE.NOT_ACTIVE)
      new UnauthorizedException('Not activated account');
    return user;
  }

  async validateWithGoogle(email: string, name: string): Promise<User> {
    let user = await this.userService.findByEmail(email);
    if (!user) {
      user = await this.userService.create({
        email,
        name,
        password: Math.random().toString() + '#@#!f',
      });
      await this.userService.activeUser(user._id);
      user.active = USER_ACTIVE.ACTIVE;
    }
    return user;
  }
  async validateWithJWT(payload: any): Promise<User> {
    const user = await this.userService.findOne(payload.id);
    return user;
  }

  async verifyRefreshToken(refreshToken): Promise<User> {
    const refreshTokenConfig = {
      secret: this.configService.get<string>('security.refreshToken.secret'),
      expiresIn: this.configService.get<string>(
        'security.refreshToken.expires',
      ),
    };
    try {
      const payload = verify(refreshToken, refreshTokenConfig.secret) as {
        user: User;
        key: string;
      };
      return payload.user;
    } catch (err) {
      return null;
    }
  }

  async generateTokenForUser(user: User) {
    const accessTokenConfig = {
      secret: this.configService.get<string>('security.accessToken.secret'),
      expiresIn: this.configService.get<string>('security.accessToken.expires'),
    };
    const refreshTokenConfig = {
      secret: this.configService.get<string>('security.refreshToken.secret'),
      expiresIn: this.configService.get<string>(
        'security.refreshToken.expires',
      ),
    };
    return {
      accessToken: sign({ id: user._id }, accessTokenConfig.secret, {
        expiresIn: accessTokenConfig.expiresIn,
      }),
      refreshToken: sign(
        JSON.parse(JSON.stringify({ id: user._id, key: '213123' })),
        refreshTokenConfig.secret,
        {
          expiresIn: refreshTokenConfig.expiresIn,
        },
      ),
    };
  }

  // register
  async buildActiveLink(user: User): Promise<string> {
    const activeTokenConfig = {
      secret: this.configService.get<string>('security.activeToken.secret'),
      expiresIn: this.configService.get<string>('security.activeToken.expires'),
    };
    const token = sign(
      JSON.parse(JSON.stringify(user)),
      activeTokenConfig.secret,
      {
        expiresIn: activeTokenConfig.expiresIn,
      },
    );
    const rootUrl = this.configService.get<string>('google.gmail.activeUrl');
    const url = new URL(rootUrl);
    url.searchParams.append(ACTIVE_TOKEN_QUERY, token);
    console.log(url.href);
    return url.href;
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(createUserDto);
    this.mailService.sendActiveEmail(
      user.email,
      await this.buildActiveLink(user),
    );
    return user;
  }

  async activeAccount(email: string): Promise<boolean> {
    const user = await this.userService.findByEmail(email);
    await this.userService.activeUser(user._id);
    return true;
  }
  async resendActiveEmail(email: string) {
    const user = await this.userService.findByEmail(email);
    this.mailService.sendActiveEmail(
      user.email,
      await this.buildActiveLink(user),
    );
    return true;
  }

  async getUserRole(
    user: User,
    subject?: { project?: string },
  ): Promise<UserRole> {
    let uRole: UserRole = user.roles;

    // detect project id and pass role to user
    console.log(`Start detect role with project ${subject.project}`);
    const pId = subject.project;
    if (pId) {
      const rId = (await this.memberService.findOne(pId, user._id))?.role;
      if (rId) {
        const pRole = await this.roleService.findOne(pId, rId);
        uRole = { ...uRole, project: pRole };
      }
    }
    // detech system role
    console.log(`Start dectect role with isAdmin ${user.isAdmin}`);
    if (user.isAdmin) {
      uRole = { system: USER_ROLE.ADMIN, ...uRole };
    }
    return uRole;
  }
}
