import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { PUBLIC_API_KEY } from 'src/constants/PUBLIC_API_KEY';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    console.log('-----');
    const isPublicApi = this.reflector.getAllAndOverride(PUBLIC_API_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublicApi) return true;
    return super.canActivate(context);
  }
}
