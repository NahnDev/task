export type DataSubtasks = {
    name: string
}

export type DataTasks = {
    name: string
    complete?: boolean
    subtask_order?: Array<string>
    dependencies?: Array<string>
}

export type DataMembers = {
    user?: 'string'
    role: string
}

export type DataProject = {
    name: 'string'
}
