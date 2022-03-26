import { Ability, AbilityBuilder, AbilityClass, InferSubjects } from '@casl/ability';
import { UserType } from '../types/user.type';

export enum PROJECT_PERMISSION {
    UPDATE = 'UPDATE',
    TASK_MANAGE = 'TASK_MANAGE',
    FILE_MANAGE = 'FILE_MANAGE',
    ROLE_MANAGE = 'ROLE_MANAGE',
    MEMBER_MANAGE = 'MEMBER_MANAGE',
    MESSAGE_SEND = 'MESSAGE_SEND',
    MESSAGE_VIEW = 'MESSAGE_VIEW',
}
export class UserAbility {
    constructor(public _id: string) {}
}
export class ProjectAbility {}
export class MemberAbility {}
export class TaskAbility {
    constructor(public complete: boolean) {}
}
export class RoleAbility {}
export class RoomAbility {}
export class MessageAbility {}
export class FileAbility {}

export enum Actions {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

type Subjects = InferSubjects<
    | typeof UserAbility
    | typeof ProjectAbility
    | typeof MemberAbility
    | typeof TaskAbility
    | typeof RoleAbility
    | typeof RoomAbility
    | typeof MessageAbility
    | typeof FileAbility
    | 'all',
    true
>;

export type AppAbility = Ability<[Actions, Subjects]>;

export class CaslAbilityFactory {
    static createForUser(user: UserType, permissions: PROJECT_PERMISSION[]) {
        const { can, cannot, build } = new AbilityBuilder(Ability as AbilityClass<AppAbility>);
        if (!user) return build();

        // project
        can(Actions.Create, ProjectAbility);
        can(Actions.Read, ProjectAbility);
        const pPermission = permissions;
        if (pPermission) {
            // console.log(pRole.permission);
            // console.log(PROJECT_PERMISSION.UPDATE);
            // console.log(pRole.permission.includes(PROJECT_PERMISSION.UPDATE));
            can(Actions.Read, [TaskAbility, MemberAbility, RoleAbility]);
            can(Actions.Update, TaskAbility, 'complete');
            if (pPermission.includes(PROJECT_PERMISSION.UPDATE)) {
                // console.log(`.......`);
                can(Actions.Update, ProjectAbility);
                can(Actions.Delete, ProjectAbility);
            }
            if (pPermission.includes(PROJECT_PERMISSION.TASK_MANAGE)) {
                can(Actions.Manage, TaskAbility);
            }
            if (pPermission.includes(PROJECT_PERMISSION.FILE_MANAGE)) {
                can(Actions.Manage, FileAbility);
            }

            if (pPermission.includes(PROJECT_PERMISSION.ROLE_MANAGE)) {
                can(Actions.Manage, RoleAbility);
            }
            if (pPermission.includes(PROJECT_PERMISSION.MEMBER_MANAGE)) {
                can(Actions.Manage, MemberAbility);
            }

            if (pPermission.includes(PROJECT_PERMISSION.MESSAGE_VIEW)) {
                can(Actions.Read, RoomAbility);
                can(Actions.Read, MessageAbility);
            }
            if (pPermission.includes(PROJECT_PERMISSION.MESSAGE_SEND)) {
                can(Actions.Create, MessageAbility);
            }
        }

        // system
        can(Actions.Read, UserAbility, ['_id', 'active', 'name', 'isAdmin']);
        can(Actions.Read, UserAbility, { _id: user._id });
        can(Actions.Update, UserAbility, ['name', 'password'], { _id: user._id });
        // can(Actions.Update, UserAbility, { active: USER_ACTIVE.ACTIVE, _id: user._id });

        if (user.isAdmin) {
            can([Actions.Delete, Actions.Create], UserAbility);
            can([Actions.Update], UserAbility, ['active']);
        }

        return build();
    }
}
