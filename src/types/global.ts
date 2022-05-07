export type Router = {
    path: string;
    component: any;
    role?: Array<string>;
    isLogin: boolean;
};

export interface Token {
    accessToken: string;
    refreshToken: string;
    expires: number;
}

export interface User {
    _id: string;
    name?: string;
    email?: string;
    active?: string;
    isAdmin?: boolean;

    isLogin?: boolean;
}

export type Role = {
    _id?: string;

    name: string;
    default?: boolean;
    permission: Array<string>;
    project?: string;
};

export type Member = {
    _id: string;
    project: string;
    role: Role;
    user: User;
};

export type Project = {
    _id: string;
    name: string;
    author: string;

    members: Array<Member>;
    roles?: Array<any>;
};

export type Task = {
    name: string;
    _id?: string;
    complete?: boolean;
    completable?: boolean;
    subtask_order?: Array<string>;
    description?: string;
    dependencies?: Array<string>;
    expires?: number;
    project?: string;
    assignee?: Array<any>;
    status?: string;
};
