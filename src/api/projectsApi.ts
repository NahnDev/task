import {
    typeDataMembers,
    typeDataProject,
    typeDataSubtasks,
    typeDataTasks,
} from '../constants/type'
import axiosClient from './axiosClient'

const projectsApi = {
    // Subtask
    postSubtasks: (_pid: string, _id: string, data: typeDataSubtasks) => {
        const url = `/projects/${_pid}/tasks/${_id}/subtasks`
        return axiosClient.post(url, data)
    },

    // Task
    getTasks: (_pid: string, _id: string) => {
        const url = `/projects/${_pid}/tasks`
        return axiosClient.get(url)
    },

    getTasksDetail: (_pid: string, _id: string) => {
        const url = `/projects/${_pid}/tasks/${_id}`
        return axiosClient.get(url)
    },

    postTasks: (_pid: string, data: typeDataTasks) => {
        const url = `/projects/${_pid}/tasks`
        return axiosClient.post(url, data)
    },

    patchTasks: (_pid: string, _id: string, data: typeDataTasks) => {
        const url = `/projects/${_pid}/tasks/${_id}`
        return axiosClient.patch(url, data)
    },

    deleteTasks: (_pid: string, _id: string) => {
        const url = `/projects/${_pid}/tasks/${_id}`
        return axiosClient.delete(url)
    },

    // Member
    getMembers: (_pid: string) => {
        const url = `/projects/${_pid}/members`
        return axiosClient.get(url)
    },

    postMembers: (_pid: string, data: typeDataMembers) => {
        const url = `/projects/${_pid}/members`
        return axiosClient.post(url, data)
    },

    patchMembers: (_pid: string, _userId: string, data: typeDataMembers) => {
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
        return axiosClient.get(url)
    },

    getProjectsDetail: (_pid: string) => {
        const url = `/projects/${_pid}`
        return axiosClient.get(url)
    },

    postProjects: (data: typeDataProject) => {
        const url = `/projects`
        return axiosClient.post(url, data)
    },

    patchProjects: (_pid: string, data: typeDataProject) => {
        const url = `/projects/${_pid}`
        return axiosClient.patch(url, data)
    },

    deleteProjects: (_pid: string) => {
        const url = `/projects/${_pid}`
        return axiosClient.delete(url)
    },
}
export default projectsApi
