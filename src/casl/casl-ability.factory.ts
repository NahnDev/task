import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
} from '@casl/ability';
import { ProjectMember } from 'src/project/member/schemas/project-member.schema';
import { Project } from 'src/project/schemas/project.schema';
import { Task } from 'src/project/task/schemas/task.schema';
import { PROJECT_ROLE } from 'src/roles/project.role';
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

    return build();
  }
}
