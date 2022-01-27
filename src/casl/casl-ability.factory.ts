import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
} from '@casl/ability';
import { USER_ACTIVE } from 'src/enums/user-active.enum';
import { Member } from 'src/project/member/schemas/member.schema';
import { Project } from 'src/project/schemas/project.schema';
import { Task } from 'src/project/task/schemas/task.schema';
import { USER_ROLE } from 'src/constants/user.role';
import { User } from 'src/user/schemas/user.schema';
import { PROJECT_PERMISSION } from 'src/enums/project-permission.enum';
import { Role } from 'src/project/role/schemas/role.schema';

export enum Actions {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects = InferSubjects<
  | typeof User
  | typeof Project
  | typeof Member
  | typeof Task
  | typeof Role
  | 'all',
  true
>;

export type AppAbility = Ability<[Actions, Subjects]>;

export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );
    if (!user) return build();

    // project
    can(Actions.Create, Project);
    can(Actions.Read, Project);
    const pRole = user.roles.project;
    if (pRole) {
      console.log(pRole.permission);
      console.log(PROJECT_PERMISSION.UPDATE);
      console.log(pRole.permission.includes(PROJECT_PERMISSION.UPDATE));
      can(Actions.Read, [Task, Member, Role]);
      can(Actions.Update, Task, 'complete');
      if (pRole.permission.includes(PROJECT_PERMISSION.UPDATE)) {
        console.log(`.......`);
        can(Actions.Update, Project);
        can(Actions.Delete, Project);
      }
      if (pRole.permission.includes(PROJECT_PERMISSION.TASK_MANAGE)) {
        can(Actions.Manage, Task);
      }
      if (pRole.permission.includes(PROJECT_PERMISSION.ROLE_MANAGE)) {
        can(Actions.Manage, Role);
      }
      if (pRole.permission.includes(PROJECT_PERMISSION.MEMBER_MANAGE)) {
        can(Actions.Manage, Member);
      }
    }

    // system
    can(Actions.Read, User, ['_id', 'active', 'name', 'isAdmin']);
    can(Actions.Read, User, { _id: user._id });
    can(Actions.Update, User, ['name', 'password'], { _id: user._id });
    can(Actions.Update, User, { active: USER_ACTIVE.ACTIVE, _id: user._id });

    if (user.isAdmin) {
      can([Actions.Delete, Actions.Create], User);
      can([Actions.Update], User, ['active']);
    }

    return build();
  }
}
