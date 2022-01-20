import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ProjectMemberService } from 'src/project/member/member.service';
import { User } from 'src/user/schemas/user.schema';
import { Request } from 'express';
import { PID } from 'src/constants/PID';
import { log } from 'console';
import { Reflector } from '@nestjs/core';
import { PUBLIC_API_KEY } from 'src/constants/PUBLIC_API_KEY';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CHECK_POLICIES_KEY } from 'src/constants/CHECK_POLICIES_KEY';
import { PolicyHandler } from 'src/casl/policy-handler';
import { AppAbility, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
@Injectable()
export class PoliciesGuard extends JwtAuthGuard implements CanActivate {
  constructor(
    private memberService: ProjectMemberService,
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
    if (!user) return false;

    // detect project id and pass role to user
    const pId = (req as Request).params[PID];
    if (pId) {
      const role = (await this.memberService.findOne(pId, user._id))?.role;
      if (role) req.user.role = { project: role, ...(req.user.role || {}) };
    }

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
