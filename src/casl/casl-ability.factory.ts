import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
} from '@casl/ability';
import { USER_ACTIVE } from 'src/enums/user-active.enum';
import { ProjectMember } from 'src/project/member/schemas/project-member.schema';
import { Project } from 'src/project/schemas/project.schema';
import { Task } from 'src/project/task/schemas/task.schema';
import { PROJECT_ROLE } from 'src/roles/project.role';
import { USER_ROLE } from 'src/roles/user.role';
import { User } from 'src/user/schemas/user.schema';

export enum Actions {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

type Subjects = InferSubjects<
  typeof User | typeof Project | typeof ProjectMember | typeof Task | 'all',
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
    const pRole = user.role?.project;
    if (pRole) {
      can(Actions.Read, [Task, ProjectMember]);
      can(Actions.Update, Task, 'complete');
      if ([PROJECT_ROLE.MANAGER, PROJECT_ROLE.OWNER].includes(pRole)) {
        can(Actions.Manage, [Task, ProjectMember, Project]);
      }
    }
    // system
    const uRole = user.role?.user;
    can(Actions.Read, User, ['_id', 'active', 'name', 'isAdmin']);
    can(Actions.Read, User, { _id: user._id });
    can(Actions.Update, User, ['name', 'password'], { _id: user._id });
    can(Actions.Update, User, { active: USER_ACTIVE.ACTIVE, _id: user._id });

    if (uRole === USER_ROLE.ADMIN) {
      can([Actions.Delete, Actions.Create], User);
      can([Actions.Update], User, ['active']);
    }

    return build();
  }
}
