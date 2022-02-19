import { TProjectRef } from './project.type';
import { TTaskRef } from './task.type';
import { TUserRef } from './user.type';

export type NotifyType = {
    _id: string;
    from?: TUserRef;
    content?: string;
    project?: TProjectRef;
    task?: TTaskRef;
    at: number;
};
