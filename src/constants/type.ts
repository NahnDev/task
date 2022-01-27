export type typeUser = {
    isLogin: boolean
}
export type typeRouter = {
    path: string
    component: any
    role?: Array<string>
    isLogin: boolean
}

export type typeDataLogin = {
    email: string
    password: string
}

export type typeDataRegister = {
    name: string
    email: string
    password: string
}

export type typeDataSubtasks = {
    name: string
}

export type typeDataTasks = {
    name: string
    complete?: boolean
    subtask_order?: Array<string>
    dependencies?: Array<string>
}

export type typeDataMembers = {
    user?: 'string'
    role: string
}

export type typeDataProject = {
    name: 'string'
}

export type typeDataUser = {
    name: 'string'
    email?: 'string'
    password: 'string'
}
