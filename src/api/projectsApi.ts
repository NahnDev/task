import { DataMembers, DataProject, DataSubtasks } from '../types/api'
import { Member, Project, Task } from '../types/global'
import axiosClient from './axiosClient'

const projectsApi = {
    // Subtask
    postSubtasks: (_pid: string, _id: string, data: DataSubtasks) => {
        const url = `/projects/${_pid}/tasks/${_id}/subtasks`
        return axiosClient.post<any, Task>(url, data)
    },

    // Task
    getTasks: (_pid: string) => {
        const url = `/projects/${_pid}/tasks`
        return axiosClient.get<any, Array<Task>>(url)
    },

    getTasksDetail: (_pid: string, _id: string) => {
        const url = `/projects/${_pid}/tasks/${_id}`
        return axiosClient.get<any, Task>(url)
    },

    postTasks: (_pid: string, data: Task) => {
        const url = `/projects/${_pid}/tasks`
        return axiosClient.post<any, Task>(url, data)
    },

    patchTasks: (_pid: string, _id: string, data: Task) => {
        const url = `/projects/${_pid}/tasks/${_id}`
        return axiosClient.patch<any, Task>(url, data)
    },

    patchTasksComplete: (_pid: string, _id: string) => {
        const url = `/projects/${_pid}/tasks/${_id}/complete`
        return axiosClient.patch<any, Task>(url)
    },

    deleteTasks: (_pid: string, _id: string) => {
        const url = `/projects/${_pid}/tasks/${_id}`
        return axiosClient.delete(url)
    },

    postAssigneeTasks: (_pid: string, _id: string, data: { member: string }) => {
        const url = `/projects/${_pid}/tasks/${_id}/assignee`
        return axiosClient.post<any, Task>(url, data)
    },

    deleteAssigneeTasks: (_pid: string, _id: string, _uid: string) => {
        const url = `/projects/${_pid}/tasks/${_id}/assignee/${_uid}`
        return axiosClient.delete(url)
    },

    // Member
    getMembers: (_pid: string) => {
        const url = `/projects/${_pid}/members`
        return axiosClient.get<any, Array<any>>(url)
    },

    postMembers: (_pid: string, data: DataMembers) => {
        const url = `/projects/${_pid}/members`
        return axiosClient.post<any, Member>(url, data)
    },

    patchMembers: (_pid: string, _userId: string, data: DataMembers) => {
        const url = `/projects/${_pid}/members/${_userId}`
        return axiosClient.patch(url, data)
    },

    deleteMembers: (_pid: string, _userId: string) => {
        const url = `/projects/${_pid}/members/${_userId}`
        return axiosClient.delete(url)
    },

    // Projects
    getProjects: () => {
        const url = `/projects`
        return axiosClient.get<any, Array<Project>>(url)
    },

    getProjectsDetail: (_pid: string) => {
        const url = `/projects/${_pid}`
        return axiosClient.get<any, Project>(url)
    },

    postProjects: (data: DataProject) => {
        const url = `/projects`
        return axiosClient.post(url, data)
    },

    patchProjects: (_pid: string, data: DataProject) => {
        const url = `/projects/${_pid}`
        return axiosClient.patch(url, data)
    },

    deleteProjects: (_pid: string) => {
        const url = `/projects/${_pid}`
        return axiosClient.delete(url)
    },
}
export default projectsApi
