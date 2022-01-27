import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { PolicyHandler } from 'src/casl/policy-handler';
import { AuthService } from '../auth.service';

@Injectable()
export class WsPoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const a = context.switchToWs().getClient();
    console.log('run', console.log(a));
    // user.roles = await this.authService.getUserRole(user, {
    //   project: (req as Request).params[pid],
    // });

    // const policyHandlers =
    //   this.reflector.get<PolicyHandler[]>(
    //     CHECK_POLICIES_KEY,
    //     context.getHandler(),
    //   ) || [];
    // const ability = this.caslAbilityFactory.createForUser(user);

    // return policyHandlers.every((handler) =>
    //   this.execPolicyHandler(handler, ability),
    // );
    return true;
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
