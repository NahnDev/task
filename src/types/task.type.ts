import { TUserRef } from './user.type';

export type TTask = {
    _id: string;
    assignee: TUserRef[];
    name: string;
    complete: string;
    completable: string;
    dependencies: TTaskRef[];
    subtask_order: TTaskRef[];
};

export type TTaskRef = Pick<TTask, '_id' | 'name' | 'completable' | 'complete'>;
