import {
  CanActivate,
  ConsoleLogger,
  ContextType,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { User } from 'src/user/schemas/user.schema';
import { Reflector } from '@nestjs/core';
import { PUBLIC_API_KEY } from 'src/constants/PUBLIC_API_KEY';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CHECK_POLICIES_KEY } from 'src/constants/CHECK_POLICIES_KEY';
import { PolicyHandler } from 'src/casl/policy-handler';
import { AppAbility, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { pid } from 'src/constants/PID';

@Injectable()
export class PoliciesGuard extends JwtAuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private caslAbilityFactory: CaslAbilityFactory,
    reflector: Reflector,
  ) {
    super(reflector);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (
      this.reflector.getAllAndOverride(PUBLIC_API_KEY, [
        context.getHandler(),
        context.getClass(),
      ])
    )
      return true;
    if (!(await super.canActivate(context))) return false;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    console.log(` Xac thuc thanh cong: `);
    console.log(user);
    if (!user) return false;

    user.roles = await this.authService.getUserRole(user, {
      project: (req as Request).params[pid],
    });

    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];
    const ability = this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
