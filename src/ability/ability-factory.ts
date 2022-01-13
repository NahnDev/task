import { User } from 'src/users/schemas/user.schema';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { PrimaryTask, SubTask } from 'src/tasks/schemas/task.schema';
import { Project } from 'src/projects/schemas/project.schema';
import { USER_ROLES } from 'src/users/enums/user-role.enum';
import { Injectable } from '@nestjs/common';
import { ProjectsService } from '../projects/projects.service';

export enum Actions {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
type Subjects = InferSubjects<typeof User | typeof Project | 'all', true>;
export type AppAbility = Ability<[Actions, Subjects]>;

type ProjectSubjects = InferSubjects<
  typeof PrimaryTask | typeof SubTask | 'all',
  true
>;

export type ProjectAbility = Ability<[Actions, ProjectSubjects]>;

@Injectable()
export class AbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );
    if (user.role === USER_ROLES.ADMIN) {
      can(Actions.Manage, 'all');
    } else {
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }

  createForUserInProject(user: User, project: Project) {
    const { can, cannot, build } = new AbilityBuilder<ProjectAbility>(
      Ability as AbilityClass<ProjectAbility>,
    );
    if (user.role === USER_ROLES.ADMIN) {
      can(Actions.Manage, 'all');
    } else {
    }

    return build();
    // return build({
    //   detectSubjectType: (item) =>
    //     item.constructor as ExtractSubjectType<ProjectSubjects>,
    // });
  }
}
